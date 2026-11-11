-- Kjo shton kolonën e pronarit me identifikuesin e sesionit si parazgjedhje.
alter table public.products
  add column if not exists pronari_id uuid;

-- Kjo e lidh pronarin me llogarinë dhe fshin pronësinë e mbetur kur llogaria fshihet.
do $j6$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_pronari_id_fkey'
      and conrelid = 'public.products'::regclass
  ) then
    alter table public.products
      add constraint products_pronari_id_fkey
      foreign key (pronari_id)
      references auth.users (id)
      on delete cascade;
  end if;
end;
$j6$;

-- Kjo vendos vlerën parazgjedhje në identifikuesin e përdoruesit të sesionit.
alter table public.products
  alter column pronari_id set default auth.uid();

-- Ky bllok e ndal migrimin me gabim të qartë nëse emaili nuk është zëvendësuar ose nuk ekziston.
do $j6$
declare
  email_pronar text := 'VENDOS_EMAILIN_E_LLOGARISE_EKZISTUESE_KETU';
  id_pronar uuid;
begin
  if email_pronar = 'VENDOS_EMAILIN_E_LLOGARISE_EKZISTUESE_KETU' then
    raise exception 'Zëvendëso venditmbajtësin email_pronar me emailin e një llogarie ekzistuese.';
  end if;

  select id
  into id_pronar
  from auth.users
  where lower(email) = lower(email_pronar)
  order by created_at asc
  limit 1;

  if id_pronar is null then
    raise exception 'Emaili % nuk u gjet te auth.users. Krijo llogarinë në këtë projekt dhe provo sërish.', email_pronar;
  end if;

  -- Ky përditësim i cakton vetëm rreshtat e vjetër pa pronar te llogaria e zgjedhur.
  update public.products
  set pronari_id = id_pronar
  where pronari_id is null;
end;
$j6$;

-- Kjo verifikon se nuk ka rreshta pa pronar përpara kufizimit NOT NULL.
do $j6$
declare
  rreshta_pa_pronar bigint;
begin
  select count(*)
  into rreshta_pa_pronar
  from public.products
  where pronari_id is null;

  if rreshta_pa_pronar > 0 then
    raise exception 'Kanë mbetur % rreshta pa pronar; mos vazhdo pa i caktuar.', rreshta_pa_pronar;
  end if;
end;
$j6$;

-- Kjo e bën pronarin të detyrueshëm për çdo rresht të produkteve.
alter table public.products
  alter column pronari_id set not null;

-- Ky indeks ndihmon kërkimet dhe filtrimin nga policy-t në bazën e të dhënave.
create index if not exists products_pronari_id_idx
  on public.products (pronari_id);

-- Këto japin lejet e tabelës vetëm rolit të kyçur për lexim, shtim dhe ndryshim.
grant select, insert, update on table public.products to authenticated;

-- Kjo verifikon kolonën, kufizimin, indeksin, lejet dhe rreshtat e pambushur.
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'products'
  and column_name = 'pronari_id';

-- Kjo tregon kufizimin e çelësit të huaj të pronarit.
select conname, pg_get_constraintdef(oid) as perkufizimi
from pg_constraint
where conrelid = 'public.products'::regclass
  and conname = 'products_pronari_id_fkey';

-- Kjo tregon indeksin dhe privilegjet e rolit authenticated.
select indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename = 'products'
  and indexname = 'products_pronari_id_idx';

-- Kjo kontrollon lejet e nevojshme për rolin e kyçur.
select
  has_table_privilege('authenticated', 'public.products', 'select') as authenticated_mund_te_lexoje,
  has_table_privilege('authenticated', 'public.products', 'insert') as authenticated_mund_te_shtoje,
  has_table_privilege('authenticated', 'public.products', 'update') as authenticated_mund_te_ndryshoje;

-- Kjo verifikon numrin e rreshtave pa pronar pas migrimit.
select count(*) as rreshta_pa_pronar
from public.products
where pronari_id is null;

-- PRITET: kolona pronari_id ekziston, ka parazgjedhje auth.uid(), është NOT NULL, lidhet me auth.users, ka indeks; zero rreshta pa pronar; roli authenticated ka leje SELECT, INSERT, UPDATE.

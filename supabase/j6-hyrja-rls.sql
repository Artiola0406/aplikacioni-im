-- Ky skedar bashkon hapat A, C dhe policy-t J6 për public.products.
-- Para ekzekutimit, krijo dy llogaritë dhe zëvendëso venditmbajtësin e emailit.
-- Ekzekutoje në SQL Editor të projektit tënd Supabase.

-- Ky bllok heq të gjitha policy-t ekzistuese të tabelës së produkteve.
do $j6$
declare
  politika record;
begin
  for politika in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
  loop
    execute format(
      'drop policy if exists %I on public.products',
      politika.policyname
    );
  end loop;
end;
$j6$;

-- Kjo revokon të gjitha lejet e anon në tabelën e produkteve.
revoke all privileges on table public.products from anon;

-- Kjo heq lejet e trashëguara nga PUBLIC, që anon të mos trashëgojë qasje.
revoke all privileges on table public.products from public;

-- Kjo aktivizon kontrollin RLS për tabelën e produkteve.
alter table public.products enable row level security;

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

-- Ky bllok ndalon migrimin nëse emaili nuk është zëvendësuar ose nuk ekziston.
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

  -- Ky përditësim i cakton rreshtat pa pronar te llogaria e zgjedhur.
  update public.products
  set pronari_id = id_pronar
  where pronari_id is null;
end;
$j6$;

-- Kjo ndalon vazhdimin nëse mbetet ndonjë produkt pa pronar.
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

-- Ky indeks ndihmon kërkimet sipas pronarit në bazën e të dhënave.
create index if not exists products_pronari_id_idx
  on public.products (pronari_id);

-- Këto japin lejet e nevojshme vetëm për përdoruesit e kyçur.
grant select, insert, update on table public.products to authenticated;

-- Këto krijojnë policy-n e leximit vetëm për rreshtat e pronarit të sesionit.
drop policy if exists products_lexo_pronarin on public.products;
create policy products_lexo_pronarin
  on public.products
  for select
  to authenticated
  using (pronari_id = auth.uid());

-- Këto krijojnë policy-n e shtimit vetëm për identifikuesin e sesionit aktual.
drop policy if exists products_shto_pronarin on public.products;
create policy products_shto_pronarin
  on public.products
  for insert
  to authenticated
  with check (pronari_id = auth.uid());

-- Këto krijojnë policy-n e ndryshimit vetëm për rreshtat e pronarit të sesionit.
drop policy if exists products_ndrysho_pronarin on public.products;
create policy products_ndrysho_pronarin
  on public.products
  for update
  to authenticated
  using (pronari_id = auth.uid())
  with check (pronari_id = auth.uid());

-- Kjo verifikon aktivizimin e RLS-së në tabelën e produkteve.
select
  n.nspname as skema,
  c.relname as tabela,
  c.relrowsecurity as rls_aktiv
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'products';

-- Kjo verifikon policy-t dhe kufizimet e tyre sipas rolit dhe veprimit.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'products'
order by policyname;

-- Kjo verifikon se anon nuk ka leje tabele dhe authenticated ka lejet e veta.
select
  has_table_privilege('anon', 'public.products', 'select') as anon_mund_te_lexoje,
  has_table_privilege('anon', 'public.products', 'insert') as anon_mund_te_shtoje,
  has_table_privilege('authenticated', 'public.products', 'select') as authenticated_mund_te_lexoje,
  has_table_privilege('authenticated', 'public.products', 'insert') as authenticated_mund_te_shtoje,
  has_table_privilege('authenticated', 'public.products', 'update') as authenticated_mund_te_ndryshoje;

-- Kjo verifikon kolonën e pronarit, parazgjedhjen dhe kufizimin NOT NULL.
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'products'
  and column_name = 'pronari_id';

-- Kjo verifikon që nuk ka mbetur asnjë rresht pa pronar.
select count(*) as rreshta_pa_pronar
from public.products
where pronari_id is null;

-- PRITET: anon nuk lexon dhe nuk shton; authenticated ka SELECT, INSERT, UPDATE; pronari_id është NOT NULL me parazgjedhje auth.uid(); ekzistojnë tri policy vetëm për authenticated; telefonat shohin vetëm produktet e llogarisë përkatëse.

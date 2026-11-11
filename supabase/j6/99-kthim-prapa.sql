-- KUJDES: Ky skedar është vetëm për rikthim në rast urgjence në mjedisin e zhvillimit.
-- KUJDES: Ky skedar nuk e hap anon dhe nuk e bën tabelën publike.
-- KUJDES: Mos e ekzekuto në prodhim dhe mos e lër qasjen anon të hapur.

-- Kjo i heq policy-t J6 të tabelës, pa fshirë të dhënat ose kolonën e pronarit.
do $j6$
declare
  politika record;
begin
  for politika in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname in (
        'products_lexo_pronarin',
        'products_shto_pronarin',
        'products_ndrysho_pronarin'
      )
  loop
    execute format(
      'drop policy if exists %I on public.products',
      politika.policyname
    );
  end loop;
end;
$j6$;

-- Kjo mban të mbyllura lejet anonime edhe pas heqjes së policy-ve.
revoke all privileges on table public.products from anon;

-- Kjo mban të mbyllura edhe lejet anonime të trashëguara nga roli PUBLIC.
revoke all privileges on table public.products from public;

-- Kjo e mban RLS-në aktive që rreshtat pronësorë të mos bëhen publikë.
alter table public.products enable row level security;

-- Kjo verifikon se anon nuk ka leje dhe se RLS mbetet aktiv.
select
  c.relrowsecurity as rls_aktiv,
  has_table_privilege('anon', 'public.products', 'select') as anon_mund_te_lexoje,
  has_table_privilege('anon', 'public.products', 'insert') as anon_mund_te_shtoje
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'products';

-- PRITET: RLS mbetet aktiv dhe anon nuk mund të lexojë ose shtojë; policy-t hiqen, prandaj përdoruesit e kyçur nuk do të kenë qasje derisa ti t'i rikrijosh vetë.

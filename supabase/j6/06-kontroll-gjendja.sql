-- Kjo tregon nëse RLS është aktiv dhe i detyruar te public.products.
select
  n.nspname as skema,
  c.relname as tabela,
  c.relrowsecurity as rls_aktiv,
  c.relforcerowsecurity as rls_i_detyruar
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'products';

-- Kjo liston policy-t, rolet, veprimet, kushtet dhe kushtet e kontrollit.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'products'
order by policyname;

-- Kjo tregon privilegjet për anon dhe authenticated.
select
  grantee,
  privilege_type,
  is_grantable
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'products'
  and grantee in ('anon', 'authenticated')
order by grantee, privilege_type;

-- Kjo liston kolonat dhe parazgjedhjet e tabelës së produkteve.
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'products'
order by ordinal_position;

-- Kjo numëron rreshtat sipas pronarit për kontroll administrativ.
select pronari_id, count(*) as numri_rreshtave
from public.products
group by pronari_id
order by pronari_id;

-- PRITET: RLS aktiv; policy-t u përkufizuan nga ti për authenticated; anon nuk ka leje; kolona pronari_id është e pranishme dhe numrat sipas pronarit duken të pritshëm.

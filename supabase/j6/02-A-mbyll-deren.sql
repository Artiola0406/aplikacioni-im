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

-- Kjo heq edhe lejet e trashëguara nga roli PUBLIC, që anon të mos trashëgojë qasje.
revoke all privileges on table public.products from public;

-- Kjo aktivizon kontrollin RLS për tabelën e produkteve.
alter table public.products enable row level security;

-- Këto pyetje verifikojnë gjendjen e RLS-së, policy-t dhe lejet e anon.
select
  n.nspname as skema,
  c.relname as tabela,
  c.relrowsecurity as rls_aktiv,
  c.relforcerowsecurity as rls_i_detyruar
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'products';

-- Kjo liston policy-t që kanë mbetur pas mbylljes.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'products';

-- Kjo tregon nëse anon ende ka ndonjë privilegj tabele.
select
  has_table_privilege('anon', 'public.products', 'select') as anon_mund_te_lexoje,
  has_table_privilege('anon', 'public.products', 'insert') as anon_mund_te_shtoje,
  has_table_privilege('anon', 'public.products', 'update') as anon_mund_te_ndryshoje,
  has_table_privilege('anon', 'public.products', 'delete') as anon_mund_te_fshije;

-- PRITET: RLS aktiv; asnjë policy e vjetër nuk mbetet; të gjitha vlerat e anon_* janë false; telefoni pa hyrje merr "permission denied".

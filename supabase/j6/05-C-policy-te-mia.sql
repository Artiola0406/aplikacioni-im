-- Kjo krijon policy-n e leximit vetëm për rreshtat e pronarit të sesionit.
drop policy if exists products_lexo_pronarin on public.products;
create policy products_lexo_pronarin
  on public.products
  for select
  to authenticated
  using (pronari_id = auth.uid());

-- Kjo krijon policy-n e shtimit që pranon vetëm identifikuesin e sesionit aktual.
drop policy if exists products_shto_pronarin on public.products;
create policy products_shto_pronarin
  on public.products
  for insert
  to authenticated
  with check (pronari_id = auth.uid());

-- Kjo krijon policy-n e ndryshimit që kufizon rreshtin para dhe pas përditësimit.
drop policy if exists products_ndrysho_pronarin on public.products;
create policy products_ndrysho_pronarin
  on public.products
  for update
  to authenticated
  using (pronari_id = auth.uid())
  with check (pronari_id = auth.uid());

-- Kjo verifikon se tri policy-t e pronarit janë të pranishme dhe për authenticated.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'products'
order by policyname;

-- PRITET: ekzistojnë tri policy për authenticated: SELECT, INSERT dhe UPDATE; secila kufizon rreshtat sipas pronarit të sesionit.

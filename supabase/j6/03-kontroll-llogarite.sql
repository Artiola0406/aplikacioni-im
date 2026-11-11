-- Kjo liston llogaritë Auth që duhet të ekzistojnë para hapit 04.
select id, email, created_at
from auth.users
order by created_at asc;

-- PRITET: të paktën dy llogari të projektit tënd, një për secilin anëtar, me email dhe datë krijimi.

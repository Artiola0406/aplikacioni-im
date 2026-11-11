# J6 — Udhëzuesi i zbatimit

## Rendi i punës dhe përgjegjësitë

Punoni me radhë. Ti dhe bashkëstudenti krijoni llogaritë para se të kaloni te caktimi i pronarit. Ti ekzekuton skedarët SQL në projektin e duhur Supabase. Skedari 05 përmban tri policy-t e pronarit për këtë zbatim J6.

| Radha | Kush | Skedari / veprimi | Rezultati i pritur |
|---|---|---|---|
| 1 | Ti | `01-O-konfirmimi-email.md` | Konfirmimi i emailit çaktivizohet për provat e J6. |
| 2 | Ti dhe bashkëstudenti | Regjistroni dy llogari në aplikacion; pastaj ekzekutoni `03-kontroll-llogarite.sql`. | Të dyja llogaritë shfaqen te përdoruesit e Supabase Auth. |
| 3 | Ti | `02-A-mbyll-deren.sql` | Politikat ekzistuese të tabelës `products` hiqen, RLS aktivizohet dhe roli `anon` nuk ka leje. Telefoni pa sesion merr gabim lejeje. |
| 4 | Ti | `04-C-kolona-pronari.sql` | Rreshtat ekzistues caktohen te një llogari ekzistuese; pronari i rreshtave të rinj caktohet në server. |
| 5 | Ti | Ekzekuto `05-C-policy-te-mia.sql`. | Vetëm llogaria përkatëse mund të lexojë, shtojë dhe ndryshojë rreshtat e vet. |
| 6 | Ti | `06-kontroll-gjendja.sql` | Shihen statusi i RLS-së, policy-t, lejet, kolona dhe numri i rreshtave sipas pronarit. |
| 7 | Ti dhe bashkëstudenti | `07-D-testi-dy-telefona.md` | Verifikohet ndarja e të dhënave me dy llogari në dy telefona. |

`supabase/j6-hyrja-rls.sql` është versioni i bashkuar i hapave 3, 4 dhe 5. Përdore në vend të skedarëve 02, 04 dhe 05; mos i ekzekuto të dyja rrugët nëse nuk ke arsye. Krijo dy llogaritë dhe zëvendëso venditmbajtësin e emailit para ekzekutimit. Ekzekutoje vetëm një herë për migrimin fillestar; për provë të veçantë, skedarët me numra mund të ekzekutohen një nga një.

## Si ekzekutohet

1. Hape projektin e duhur në panelin Supabase.
2. Shko te **SQL Editor**, krijo pyetje të re, kopjo të gjithë përmbajtjen e skedarit përkatës `.sql` dhe ekzekutoje.
3. Lexo rezultatin e çdo hapi para se të vazhdosh. Te `04-C-kolona-pronari.sql`, zëvendëso tekstin e shënuar `VENDOS_EMAILIN_E_LLOGARISE_EKZISTUESE_KETU` me emailin e saktë të njërit prej dy përdoruesve.
4. Pas migrimit 04, ekzekuto skedarin 05 për policy-t, nëse nuk ke përdorur skedarin e bashkuar.
5. Mbaj `99-kthim-prapa.sql` vetëm si udhëzues emergjent për mjedisin e zhvillimit. Ai heq policy-t e emërtuara të J6, por nuk e hap qasjen anonime dhe nuk i fshin kolonën apo të dhënat e pronarit.

## Rezultatet dhe zgjidhja e gabimeve

| Gabimi ose rezultati | Shkaku i mundshëm | Zgjidhja |
|---|---|---|
| `permission denied for table products` kur je i kyçur | Lejet e rolit të kyçur mungojnë ose sesioni i aplikacionit nuk është aktiv. | Kontrollo në hapin 06 lejet e `authenticated`; verifiko në aplikacion që llogaria është e kyçur. |
| Lista është bosh pa gabim | Nuk ka rreshta për atë pronar, ose policy-ja e leximit / emaili i rikthimit nuk përputhet me llogarinë. | Kontrollo emailin e zgjedhur te hapi 04 dhe numrat për pronar te hapi 06. |
| `violates row-level security policy` gjatë shtimit | Policy-ja e shtimit mungon ose sesioni nuk përputhet me pronarin e caktuar nga serveri. | Verifiko që skedari 05 u ekzekutua dhe provo sërish nga aplikacioni me llogarinë përkatëse. |
| Hapi 04 thotë se emaili nuk u gjet | Venditmbajtësi nuk u zëvendësua ose llogaria nuk është krijuar në këtë projekt Supabase. | Krijo llogaritë në projektin e duhur dhe zëvendëso venditmbajtësin me email ekzistues. |
| Telefoni pa hyrje merr `permission denied` | RLS dhe lejet anonime janë mbyllur siç pritet. | Hyr me llogarinë tënde për të përdorur listën. |

## Paralajmërim për testim

SQL Editor punon me privilegje administrative dhe nuk është provë e sjelljes së RLS-së për llogaritë e aplikacionit. Testet e privatësisë kryeji vetëm në telefon, nga aplikacioni dhe me dy llogaritë e testimit. Mos e lër anon të ketë qasje në të dhëna pronari.

## Përshtatja për aplikacionin

Për J6 përdoret tabela ekzistuese `products`, sepse aplikacioni tashmë e lexon dhe shton produktin aty. Kjo është zgjidhje prove për ndarjen mes dy llogarive. Në produktin përfundimtar, menyja duhet të jetë e përbashkët për përdoruesit e kyçur, ndërsa të dhënat personale, si porositë në një tabelë `orders`, duhet të kenë pronësinë e tyre.

# Modeli i hyrjes dhe të dhënave

## Çka pyet aplikacioni

- Regjistron përdorues përmes Supabase Auth me email dhe fjalëkalim.
- Kyç përdoruesin me email dhe fjalëkalim.
- Çkyç përdoruesin dhe lexon sesionin e ruajtur.
- Lexon dhe shton të dhëna në tabelën `products`, sipas qasjes së lejuar nga Supabase.

## Çka mban aplikacioni

- Klienti Supabase ruan tokenin e sesionit në ruajtjen lokale të pajisjes.
- Aplikacioni nuk ruan fjalëkalime.
- Kur `pronari_id` të konfigurohet në Supabase, ai caktohet nga serveri.
- Aplikacioni nuk ruan role në metadata të përdoruesit.
- Për provën J6, produktet lidhen me pronarin; në modelin përfundimtar menyja duhet të jetë e përbashkët.
- Të dhënat personale, si porositë në një tabelë `orders`, duhet të kenë pronësinë e tyre.

## Çka NUK bën aplikacioni

- Nuk dërgon `pronari_id` gjatë shtimit të të dhënave.
- Nuk filtron përdoruesit në telefon për të simuluar privatësinë.
- Nuk përdor çelës shërbimi.

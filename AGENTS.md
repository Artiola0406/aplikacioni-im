# Projekti: aplikacion për porosi ushqimi
- Qëllimi: aplikacion mobil për porosi ushqimi nga restorant lokal në Skenderaj/Mitrovicë; klienti shfleton menynë, porosit me para në dorë dhe ndjek statusin deri në dorëzim.
- Puna e vetme: klienti bën një porosi nga menyja deri në dorëzim dhe e sheh statusin pa telefonuar restorantin.
- Stack: Expo SDK 58, Expo Router, TypeScript dhe Supabase.
- Struktura: rrugët në `src/app`, komponentët në `src/components`, klienti Supabase në `src/lib/supabase.ts`.
- Tabela aktuale në Supabase: products (id, name, description, price, category, is_available).
- Statusi i projektit: M0 është pjesërisht i përfunduar: AGENTS.md dhe dokumentacioni rrënjës janë të gjurmuar, por mbetet mbetje e idesë së kuizit në `src/app/IDETE.md`. M1 është pjesërisht i përfunduar: klienti Supabase përdor çelës publishable dhe listimi, detajet dhe shtimi i produkteve përdorin tabelën `products`; versionet e paketa/Expo dhe lint-i mbeten të pafunduar, dhe insert-i anon është vetëm demo.
- Çfarë është JASHTË MVP-së: paneli web, harta me korrier, GPS real, pagesa online, njoftimet push.

## Agjenti
- Agjenti që punon në këtë projekt: Cursor (modaliteti Agent).
- Si punon: lexon AGENTS.md para çdo detyre; ndryshon vetëm skedarët që kërkohen; nuk instalon paketa pa nevojë; para çdo ndryshimi që prek Expo lexon dokumentacionin e SDK 58.
- Siguria: asnjëherë nuk vendos çelësa ose fjalëkalime në kod ose në Git; .env.local mbetet jashtë repository-t; përdoret vetëm çelësi publishable i Supabase.
- Rrjedha e punës: një ndryshim i vogël → testim në telefon → përdoruesja lexon diff-in → commit nga përdoruesja.
- Komandat në Windows: npx.cmd, npm.cmd. Para çdo detyre të përfunduar: npx.cmd tsc --noEmit dhe npx.cmd expo lint.
- Rregulla për ndarjen e punës: ky projekt kryhet nga dy studentë; mos ndrysho pjesën e tjetrit pa u njoftuar.

# Projekti: aplikacion për porosi ushqimi

Aplikacion mobil për porosi ushqimi nga një restorant lokal (Skenderaj/Mitrovicë). Klienti e shikon menynë, e shton produktin në shportë, bën porosinë (pagesë me para në dorë) dhe e ndjek statusin deri në dorëzim.

- Puna e vetme: klienti bën një porosi nga menyja deri në dorëzim dhe e sheh statusin pa telefonuar restorantin.
- Stack: Expo SDK 58, Expo Router (rrugët në src/app), TypeScript, Supabase (Postgres, Auth, RLS).
- Gjuha e ndërfaqes: shqip. Në tabela përdoren emra anglisht (products, orders).
- Rregull: ndrysho vetëm çfarë kërkohet, mos instalo biblioteka pa nevojë, mos vendos çelësa në kod.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

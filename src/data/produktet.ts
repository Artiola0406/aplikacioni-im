export type Produkt = {
  id: string;
  emri: string;
  pershkrimi: string;
  cmimi: number;
  kategoria: string;
  disponueshem: boolean;
};

export const produktet: Produkt[] = [
  {
    id: "1",
    emri: "Burger Klasik",
    pershkrimi: "Mish viçi, djathë, sallatë, domate dhe salcë e shtëpisë.",
    cmimi: 4,
    kategoria: "Burgerë",
    disponueshem: true,
  },
  {
    id: "2",
    emri: "Burger me Pulë",
    pershkrimi: "Pulë e skuqur, sallatë, majonezë dhe turshi.",
    cmimi: 3.5,
    kategoria: "Burgerë",
    disponueshem: true,
  },
  {
    id: "3",
    emri: "Pizza Margherita",
    pershkrimi: "Salcë domateje, mocarela dhe borzilok.",
    cmimi: 5,
    kategoria: "Pizza",
    disponueshem: true,
  },
  {
    id: "4",
    emri: "Pizza Capricciosa",
    pershkrimi: "Mocarela, proshutë, kërpudha dhe ullinj.",
    cmimi: 6.5,
    kategoria: "Pizza",
    disponueshem: false,
  },
  {
    id: "5",
    emri: "Coca-Cola 0.5L",
    pershkrimi: "Pije e freskët, e ftohtë.",
    cmimi: 1.5,
    kategoria: "Pije",
    disponueshem: true,
  },
  {
    id: "6",
    emri: "Ujë mineral",
    pershkrimi: "Shishe 0.5L.",
    cmimi: 0.8,
    kategoria: "Pije",
    disponueshem: true,
  },
];
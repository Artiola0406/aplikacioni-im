// Tipi i një kuizi (përputhet me props-et e KartaKuizit)
export type Statusi = "i pa filluar" | "në progres" | "përfunduar";

export type Kuizi = {
  id: string;
  titulli: string;
  lenda: string;
  numriPyetjeve: number;
  statusi: Statusi;
  rezultati?: number;
};

// 6 kuize të sajuara për idenë tonë
export const kuizet: Kuizi[] = [
  {
    id: "1",
    titulli: "Proceset dhe thread-et",
    lenda: "Sistemet Operative",
    numriPyetjeve: 10,
    statusi: "përfunduar",
    rezultati: 80,
  },
  {
    id: "2",
    titulli: "Shpërndarja normale",
    lenda: "Matematikë Statistike",
    numriPyetjeve: 8,
    statusi: "përfunduar",
    rezultati: 62,
  },
  {
    id: "3",
    titulli: "Pastrimi i të dhënave",
    lenda: "Business Intelligence",
    numriPyetjeve: 12,
    statusi: "në progres",
  },
  {
    id: "4",
    titulli: "Props dhe state",
    lenda: "Zhvillimi i aplikacioneve mobile",
    numriPyetjeve: 10,
    statusi: "në progres",
  },
  {
    id: "5",
    titulli: "Portat logjike",
    lenda: "Elektronika Digjitale",
    numriPyetjeve: 15,
    statusi: "i pa filluar",
  },
  {
    id: "6",
    titulli: "Diagramat UML",
    lenda: "Inxhinieria e Softuerit",
    numriPyetjeve: 9,
    statusi: "i pa filluar",
  },
];
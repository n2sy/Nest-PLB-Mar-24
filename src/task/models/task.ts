//Version avec le DI
export class Task {
  constructor(
    public id: string,
    public title: string,
    public year: number,
    public createdAt: Date,
    public statut?: string,
  ) {}
}

// Version classique
// export class Task {
//   public id: number;
//   public title: string;
//   public year: number;
//   public statut: string;

//   constructor(id: number, title: string, year: number, statut?: string) {
//     this.id = id;
//     this.title = title;
//     this.statut = statut;
//     this.year = year;
//   }
// }

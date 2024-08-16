export type CardT = {
  id: string;
  column: string;
  content: string;
};

export type ColumnT = {
  id: string;
  cards: CardT[];
};

export type BoardT = {
  cards: CardT[];
};

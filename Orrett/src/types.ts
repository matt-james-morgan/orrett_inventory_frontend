export interface Bin {
  id: number;
  name?: string;
  description?: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  description?: string;
}

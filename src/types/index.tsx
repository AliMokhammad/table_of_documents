export interface Document {
  id: string;
  status: string;
  sum: number;
  qty: number;
  volume: number;
  name: string;
  delivery_date: string;
  currency: string;
  total: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Document;
  label: string;
  numeric: boolean;
}
export type Order = "asc" | "desc";

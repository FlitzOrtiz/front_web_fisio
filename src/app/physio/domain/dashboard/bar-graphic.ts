export interface BarGraphicData {
  id?: number;
  type: string;
  title: string;
  values: {
    label: string;
    value: number;
  }[];
}

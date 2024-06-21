// types/tabulator-tables.d.ts
declare module "tabulator-tables" {
  export default class Tabulator {
    constructor(element: HTMLElement | string, options?: TabulatorOptions);
  }

  export interface TabulatorOptions {
    data?: any[];
    layout?: string;
    columns?: ColumnDefinition[];
  }

  export interface ColumnDefinition {
    title: string;
    field: string;
    width?: number;
    formatter?: Formatter;
    align?: string;
    cellClick?: (e: Event, cell: CellComponent) => void;
  }

  export type Formatter = (
    cell: CellComponent,
    formatterParams: any,
    onRendered: () => void,
  ) => string | HTMLElement;

  export interface CellComponent {
    getValue(): any;
    getData(): any;
    getRow(): RowComponent;
  }

  export interface RowComponent {
    getData(): any;
  }
}

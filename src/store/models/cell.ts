/**
 * Cell model
 */
export type CellType = {
  isMine: boolean;
  rowId: number;
  colId: number;
  isTrigger: boolean;
  aroundMinesCount: number;
  isFlag: boolean;
};

/**
 * Cell position model
 */
export type CellPositionType = {
  row: number;
  col: number;
};

/**
 * Field size model
 */
export type FieldSizeType = {
  fieldRows: number;
  fieldCols: number;
};

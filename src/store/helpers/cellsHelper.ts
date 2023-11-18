import { InitialStateType } from "../minesweeper";
import { CellPositionType, CellType, FieldSizeType } from "../models/cell";

/**
 * Get around cells
 * @param field
 * @param cell
 * @returns aroundCells
 */
const getAroundCells = (
  field: FieldSizeType,
  cell: CellPositionType
): CellPositionType[] => {
  const { fieldRows, fieldCols } = field;
  const { row, col } = cell;
  const aroundCells = [];
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // Skip the cell itself
      if (i === row && j === col) continue;

      // Check if the cell is within the field boundaries
      if (i >= 0 && i < fieldRows && j >= 0 && j < fieldCols) {
        aroundCells.push({ row: i, col: j });
      }
    }
  }

  return aroundCells;
};

/**
 * Generate mine cells
 * @param rows
 * @param cols
 * @param mines
 * @param avoidSetMineCell
 * @returns mineCells
 */
const setMineCells = (
  field: FieldSizeType,
  mines: number,
  avoidSetMineCell: CellPositionType
): CellPositionType[] => {
  const { fieldRows, fieldCols } = field;
  const maxMines = fieldRows * fieldCols;
  if (mines > maxMines) {
    throw new Error("Number of mines exceeds the grid size.");
  }

  const minePositions = new Set<string>();

  while (minePositions.size < mines) {
    const row = Math.floor(Math.random() * fieldRows);
    const col = Math.floor(Math.random() * fieldCols);
    // if the cell is the first trigger cell, skip it
    if (row === avoidSetMineCell.row && col === avoidSetMineCell.col) continue;
    minePositions.add(`${row}-${col}`);
  }

  const mineCells = Array.from(minePositions).map((position) => {
    const [row, col] = position.split("-").map(Number);
    return { row, col };
  });
  return mineCells;
};

/**
 * Get mine cells
 * @param cells
 * @returns mineCells
 */
const getMineCells = (cells: CellType[][]): CellType[] => {
  return cells.flat().filter((cell) => cell.isMine);
};

/**
 * Get cells
 * @param rows
 * @param cols
 * @param mines
 * @param avoidSetMineCell
 * @returns cells
 */
const getCells = (
  field: FieldSizeType,
  mines: number,
  avoidSetMineCell: CellPositionType = { row: -1, col: -1 }
): CellType[][] => {
  const { fieldRows, fieldCols } = field;
  const cells = [] as CellType[][];
  for (let rowId = 0; rowId < fieldRows; rowId++) {
    const row: CellType[] = [];
    for (let colId = 0; colId < fieldCols; colId++) {
      row.push({
        isMine: false,
        rowId,
        colId,
        isTrigger: false,
        aroundMinesCount: 0,
      });
    }
    cells.push(row);
  }
  const mineCells = setMineCells(field, mines, avoidSetMineCell);
  mineCells.forEach(({ row, col }) => {
    cells[row][col].isMine = true;
  });

  return cells;
};

/**
 * Trigger cell recursively
 * @param state
 * @param cell
 * @returns void
 */
const triggerCellRecursively = (
  state: InitialStateType,
  cell: CellPositionType
) => {
  // trigger cell
  const { row, col } = cell;
  state.cells[row][col].isTrigger = true;

  // calculate around mines count
  const aroundCells = getAroundCells(state.field, cell);
  const aroundMinesCount = aroundCells.filter(
    (cell) => state.cells[cell.row][cell.col].isMine
  ).length;

  // trigger around cells recursively if aroundMinesCount is 0
  if (aroundMinesCount === 0) {
    aroundCells.forEach((cell) => {
      if (!state.cells[cell.row][cell.col].isTrigger) {
        triggerCellRecursively(state, cell);
      }
    });
  } else {
    state.cells[row][col].aroundMinesCount = aroundMinesCount;
  }
};

const isAllCellTriggered = (cells: CellType[][]): boolean => {
  return cells.flat().every((cell) => cell.isMine || cell.isTrigger);
};

export {
  getCells,
  setMineCells,
  getAroundCells,
  triggerCellRecursively,
  getMineCells,
  isAllCellTriggered,
};

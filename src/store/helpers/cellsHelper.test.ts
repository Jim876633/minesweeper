import { CellPositionType, CellType, FieldSizeType } from "../models/cell";
import { getAroundCells, getCells } from "./cellsHelper";

describe("getCells", () => {
  it("should return a 2D array of CellType objects with correct dimensions", () => {
    const rows = 5;
    const cols = 10;
    const mines = 15;
    const cells = getCells({ fieldRows: rows, fieldCols: cols }, mines);
    expect(cells.length).toBe(rows);
    expect(cells[0].length).toBe(cols);
  });

  it("should throw an error if number of mines exceeds grid size", () => {
    const rows = 5;
    const cols = 10;
    const mines = 60;

    expect(() =>
      getCells({ fieldRows: rows, fieldCols: cols }, mines)
    ).toThrowError("Number of mines exceeds the grid size.");
  });

  it("should have the correct number of mine cells", () => {
    const rows = 5;
    const cols = 10;
    const mines = 15;
    const cells = getCells({ fieldRows: rows, fieldCols: cols }, mines);

    const mineCells = cells.flat().filter((cell) => cell.isMine);
    expect(mineCells.length).toBe(mines);
  });

  it("should have all cells initialized with correct properties", () => {
    const rows = 5;
    const cols = 10;
    const mines = 15;
    const cells = getCells({ fieldRows: rows, fieldCols: cols }, mines);

    cells.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toMatchObject<CellType>({
          isMine: expect.any(Boolean),
          rowId: expect.any(Number),
          colId: expect.any(Number),
          isTrigger: expect.any(Boolean),
          aroundMinesCount: expect.any(Number),
        });
      });
    });
  });

  it("should have mine cells initialized with isMine property set to true", () => {
    const rows = 5;
    const cols = 10;
    const mines = 15;
    const cells = getCells({ fieldRows: rows, fieldCols: cols }, mines);

    const mineCells = cells.flat().filter((cell) => cell.isMine);
    mineCells.forEach((cell) => {
      expect(cell.isMine).toBe(true);
    });
  });
});

describe("getAroundCells", () => {
  const field: FieldSizeType = { fieldRows: 5, fieldCols: 10 };

  it("should return an array of CellPositionType objects with correct length", () => {
    const cell: CellPositionType = { row: 2, col: 5 };
    const aroundCells = getAroundCells(field, cell);

    expect(aroundCells.length).toBe(8);
  });

  it("should return an array of CellPositionType objects with correct values", () => {
    const cell: CellPositionType = { row: 2, col: 5 };
    const aroundCells = getAroundCells(field, cell);

    expect(aroundCells).toEqual([
      { row: 1, col: 4 },
      { row: 1, col: 5 },
      { row: 1, col: 6 },
      { row: 2, col: 4 },
      { row: 2, col: 6 },
      { row: 3, col: 4 },
      { row: 3, col: 5 },
      { row: 3, col: 6 },
    ]);
  });

  it("should return an array of CellPositionType objects with correct values for edge cells", () => {
    const cell: CellPositionType = { row: 0, col: 0 };
    const aroundCells = getAroundCells(field, cell);

    expect(aroundCells).toEqual([
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ]);
  });

  it("should return an array of CellPositionType objects with correct values for corner cells", () => {
    const cell: CellPositionType = { row: 0, col: 9 };
    const aroundCells = getAroundCells(field, cell);

    expect(aroundCells).toEqual([
      { row: 0, col: 8 },
      { row: 1, col: 8 },
      { row: 1, col: 9 },
    ]);
  });
});

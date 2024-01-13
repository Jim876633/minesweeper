import {
  GameLevelType,
  MineInfoType,
  gameLevel,
  mineCategory,
} from "@/constants/game";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getCells,
  getMineCells,
  isAllCellTriggered,
  toggleCellFlag,
  triggerCellRecursively,
} from "./helpers/cellsHelper.ts";
import { CellPositionType } from "./models/cell.ts";

const defaultLevel = gameLevel.easy;

const defaultField = {
  fieldRows: defaultLevel.rows,
  fieldCols: defaultLevel.cols,
};

/**
 * Initial state
 */
const initialState = {
  cells: getCells(defaultField, defaultLevel.mines),
  field: defaultField,
  mineEmoji: mineCategory[0].emoji,
  mineCount: defaultLevel.mines,
  isGameOver: false,
  isGameWin: false,
  isFirstTriggerCell: true,
  isFlagActive: false,
};

export type InitialStateType = typeof initialState;

/**
 * Minesweeper slice
 */
export const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    changeFieldSize: (state, action: PayloadAction<GameLevelType>) => {
      const fieldRows = gameLevel[action.payload].rows;
      const fieldCols = gameLevel[action.payload].cols;
      const mines = gameLevel[action.payload].mines;
      state.field = { fieldRows, fieldCols };
      state.mineCount = mines;
      minesweeperSlice.caseReducers.resetGame(state);
    },
    changeMineEmoji: (state, action: PayloadAction<string>) => {
      const selectMineEmoji = mineCategory.find(
        (mine) => mine.name === action.payload
      ) as MineInfoType;
      state.mineEmoji = selectMineEmoji.emoji;
    },
    triggerCell: (state, action: PayloadAction<CellPositionType>) => {
      if (state.isGameOver || state.isGameWin) return;

      // if flag is active, toggle flag
      if (state.isFlagActive) {
        return toggleCellFlag(state, action.payload);
      }

      // if cell is flag, do nothing
      const { row, col } = action.payload;
      const cellInfo = state.cells[row][col];
      if (cellInfo.isFlag) return;

      // first trigger cell
      if (state.isFirstTriggerCell) {
        state.isFirstTriggerCell = false;
      }
      // trigger cell
      triggerCellRecursively(state, action.payload);
      // check if all cells without mines are triggered
      isAllCellTriggered(state.cells) && (state.isGameWin = true);
    },
    triggerMineCell: (state, action: PayloadAction<CellPositionType>) => {
      if (state.isGameOver || state.isGameWin) return;
      if (state.isFlagActive) {
        toggleCellFlag(state, action.payload);
        return;
      }
      const { row, col } = action.payload;
      if (state.cells[row][col].isFlag) return;
      if (state.isFirstTriggerCell) {
        state.cells = getCells(state.field, state.mineCount, action.payload);
        minesweeperSlice.caseReducers.triggerCell(
          state,
          action as PayloadAction<CellPositionType>
        );
        state.isFirstTriggerCell = false;
        return;
      }
      // trigger all mine cells
      const mineCells = getMineCells(state.cells);
      mineCells.forEach(({ rowId, colId }) => {
        state.cells[rowId][colId].isTrigger = true;
      });
      state.isGameOver = true;
    },
    resetGame: (state) => {
      state.cells = getCells(state.field, state.mineCount);
      state.isGameOver = false;
      state.isGameWin = false;
      state.isFirstTriggerCell = true;
    },
  },
});

export const {
  changeFieldSize,
  changeMineEmoji,
  triggerCell,
  triggerMineCell,
  resetGame,
} = minesweeperSlice.actions;

export default minesweeperSlice;

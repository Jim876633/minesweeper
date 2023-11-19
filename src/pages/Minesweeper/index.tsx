import { GameLevelType } from "@/constants/game";
import { GAMELEVEL } from "@/enums";
import { changeFieldSize, resetGame } from "@/store/minesweeper";
import { openModal } from "@/store/modal";
import useAppDispatch from "@/utils/hooks/useAppDispatch";
import useAppSelector from "@/utils/hooks/useAppSelect";
import { useEffect } from "react";
import Cell from "./Cell";
import MineSelector from "./MineSelector";
import styled from "./index.module.scss";

const Minesweeper = () => {
  const { cells, mineCount, field, isGameOver, isGameWin } = useAppSelector(
    (state) => state.minesweeper
  );
  const dispatch = useAppDispatch();

  const changeLevelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const level = (e.target as HTMLElement).innerText;
    dispatch(changeFieldSize(level as GameLevelType));
  };

  const resetHandler = () => {
    console.log("reset");
    dispatch(resetGame());
  };

  useEffect(() => {
    if (isGameOver || isGameWin) {
      dispatch(openModal());
    }
  }, [isGameOver, isGameWin, dispatch]);

  return (
    <div className={styled.mineSweeper}>
      <h1>
        <span>minesweeper</span>
      </h1>
      <div className={styled.block}>
        <div className={styled.levelBtn}>
          <button type="button" onClick={changeLevelHandler}>
            {GAMELEVEL.EASY}
          </button>
          <button type="button" onClick={changeLevelHandler}>
            {GAMELEVEL.MEDIUM}
          </button>
          <button type="button" onClick={changeLevelHandler}>
            {GAMELEVEL.HARD}
          </button>
        </div>
      </div>
      <div className={styled.info}>
        <MineSelector />
        <span>mines: {mineCount}</span>
        <span>
          field: {field.fieldRows} X {field.fieldCols}
        </span>
        <button
          type="button"
          className={styled.resetBtn}
          onClick={resetHandler}
        >
          reset
        </button>
      </div>
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className={styled.row}>
          {row.map((cellInfo, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} cellInfo={cellInfo} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Minesweeper;

import useAppSelector from "@/utils/hooks/useAppSelect";
import styled from "./index.module.scss";
import Cell from "./Cell";
import { resetGame } from "@/store/minesweeper";
import useAppDispatch from "@/utils/hooks/useAppDispatch";

const Minesweeper = () => {
  const { cells } = useAppSelector((state) => state.minesweeper);
  const dispatch = useAppDispatch();

  const resetHandler = () => {
    console.log("reset");
    dispatch(resetGame());
  };

  return (
    <div>
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className={styled.row}>
          {row.map((cellInfo, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} cellInfo={cellInfo} />
          ))}
        </div>
      ))}
      <button onClick={resetHandler}>reset</button>
    </div>
  );
};

export default Minesweeper;

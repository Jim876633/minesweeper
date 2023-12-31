import { triggerCell, triggerMineCell } from "@/store/minesweeper";
import { CellType } from "@/store/models/cell";
import useAppDispatch from "@/utils/hooks/useAppDispatch";
import useAppSelector from "@/utils/hooks/useAppSelect";
import styled from "./index.module.scss";

type PropsType = {
  cellInfo: CellType;
};

const Cell = ({ cellInfo }: PropsType) => {
  const { mineEmoji } = useAppSelector((state) => state.minesweeper);
  const dispatch = useAppDispatch();
  const clickCellHandler = () => {
    if (cellInfo.isTrigger) return;
    if (cellInfo.isMine) {
      console.log("mine");
      dispatch(triggerMineCell({ row: cellInfo.rowId, col: cellInfo.colId }));
    } else {
      dispatch(triggerCell({ row: cellInfo.rowId, col: cellInfo.colId }));
    }
  };
  return (
    <div
      className={`${styled.field} ${
        cellInfo.isTrigger ? styled.isTriggered : ""
      }`}
      onClick={clickCellHandler}
    >
      {cellInfo.isMine && cellInfo.isTrigger && mineEmoji}
      {cellInfo.aroundMinesCount > 0 && cellInfo.aroundMinesCount}
    </div>
  );
};

export default Cell;

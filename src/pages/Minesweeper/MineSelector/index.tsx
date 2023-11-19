import { mineCategory } from "@/constants/game";
import { changeMineEmoji } from "@/store/minesweeper";
import useAppDispatch from "@/utils/hooks/useAppDispatch";
import Option from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const MineSelector = () => {
  const dispatch = useAppDispatch();
  const selectHandler = (e: SelectChangeEvent) => {
    dispatch(changeMineEmoji(e.target.value));
  };
  return (
    <Select defaultValue={mineCategory[0].name} onChange={selectHandler}>
      {mineCategory.map((category) => (
        <Option key={category.name} value={category.name}>
          {category.emoji}
        </Option>
      ))}
    </Select>
  );
};
export default MineSelector;

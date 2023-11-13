import { closeModal } from "@/store/modal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelect";
import styled from "./Modal.module.scss";
import { resetGame } from "@/store/minesweeper";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Modal = () => {
  const { isGameOver, isGameWin } = useAppSelector(
    (state) => state.minesweeper
  );
  const { isOpen } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const closeHandler = () => {
    dispatch(resetGame());
    dispatch(closeModal());
  };
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={closeHandler}
      aria-describedby="alert-dialog-slide-description"
    >
      {isGameOver && (
        <DialogContent>
          <h3 className={styled.title}>You Lose</h3>
        </DialogContent>
      )}
      {isGameWin && (
        <DialogContent>
          <h3 className={styled.title}>You Win</h3>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={closeHandler}>Try Again</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Modal;

import { GAMESTATE } from "@/enums";
import { resetGame } from "@/store/minesweeper";
import { closeModal } from "@/store/modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelect";
import styled from "./Modal.module.scss";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Modal = () => {
  const { isOpen, modalState } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isGameWin = modalState === GAMESTATE.WIN;

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const resetHandler = () => {
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
      <IconButton
        aria-label="close"
        onClick={closeHandler}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {!isGameWin && (
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
        <Button onClick={resetHandler}>Try Again</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Modal;

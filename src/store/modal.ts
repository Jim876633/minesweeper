import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalStateType } from "./models/modal";
import { GAMESTATE } from "@/enums";

const initialState: ModalStateType = {
  isOpen: false,
  modalState: GAMESTATE.WIN,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<GAMESTATE | undefined>) => {
      state.isOpen = true;
      state.modalState = action.payload ? action.payload : state.modalState;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

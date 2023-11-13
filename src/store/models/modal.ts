import { GAMESTATE } from "@/enums";

export type ModalStateType = {
  isOpen: boolean;
  modalState: keyof typeof GAMESTATE;
};

import { atom } from "recoil";

import { cell_colors, keyboard_colors } from "../components/keyboard-button/constants";

export const currentLetterAtom = atom({
  key: "currentLetter",
  default: "",
});

export const currentRowAtom = atom({
  key: "currentRow",
  default: 0,
});

export const currentColumnAtom = atom({
  key: "currentColumn",
  default: 0,
});

export const isLetterKeysDisabledAtom = atom({
  key: "isLetterKeysDisabled",
  default: false,
});

export const currentWordAtom = atom({
  key: "currentWord",
  default: "",
});

export const gameWonOrLostAtom = atom({
  key: "gameWonOrLost",
  default: 0,
});

export const isEnterAtom = atom({
  key: "enter",
  default: false,
});

export const isDeleteAtom = atom({
  key: "delete",
  default: false,
});

export const cellColorsAtom = atom({
  key: "newLetters",
  default: cell_colors,
});

export const keyColorAtom = atom({
  key: "keyColor",
  default: keyboard_colors,
});

export const clickEventAtom = atom({
  key: "clickEvent",
  default: 0,
});

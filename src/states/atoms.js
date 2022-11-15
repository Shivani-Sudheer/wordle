import { atom } from "recoil";
import { keyboard_colors } from "../components/keyboard-button/constants";

export const currentLetterAtom = atom({
  key: "currentLetter",
  default: "",
});

export const currentRowAtom = atom({
  key: "currentRow",
  default: 0,
});

export const currentColumnrAtom = atom({
  key: "currentColumn",
  default: 0,
});

export const isDisableAtom = atom({
  key: "isDisable",
  default: false,
});

export const currentWordAtom = atom({
  key: "currentWord",
  default: "",
});

export const gameWonAtom = atom({
  key: "gameWon",
  default: false,
});

export const gameLostAtom = atom({
  key: "gameLost",
  default: false,
});

export const isEnterOrDeleteAtom = atom({
  key: "enterOrDelete",
  default: false,
});

export const isEnterAtom = atom({
  key: "enter",
  default: false,
});

export const isDeleteAtom = atom({
  key: "delete",
  default: false,
});

export const isDisableEnterAtom = atom({
  key: "disableEnter",
  default: true,
});

export const newLettersAtom = atom({
  key: "newLetters",
  default: [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
  ],
});

export const keyColorATom = atom({
  key: "keyColor",
  default: keyboard_colors,
});

export const clickEventAtom = atom({
  key: "clickEvent",
  default: 0,
});

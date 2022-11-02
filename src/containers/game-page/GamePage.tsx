import { Snackbar } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Keyboard from "../../components/keyboard/Keyboard";
import NavBar from "../../components/navbar/navbar";
import Row from "../../components/row/Row";
import {
  gameLostAtom,
  gameWonAtom,
} from "../../states/atoms";
import { fetchWordSelector } from "../../states/selectors";
import "./styles.css";

const GamePage: FC = () => {
  const word = useRecoilValue(fetchWordSelector);
  const [open, setOpen] = useRecoilState(gameWonAtom);
  const [lost, setLost] = useRecoilState(gameLostAtom);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <NavBar />
      <div className="game-space">
        <div className="input-space">
          <div className="row-1">
            <Row thisRow={0}/>
          </div>
          <div className="row-2">
            <Row thisRow={1}/>
          </div>
          <div className="row-3">
            <Row thisRow={2}/>
          </div>
          <div className="row-4">
            <Row thisRow={3}/>
          </div>
          <div className="row-5">
            <Row thisRow={4}/>
          </div>
          <div className="row-6">
            <Row thisRow={5}/>
          </div>
        </div>
        <div className="keyboard">
          <Keyboard />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          message="Yayyyy! You Won"
        />
      </div>
      <div>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={lost}
          onClose={handleClose}
          message="Better luck next time :("
        />
      </div>
    </>
  );
};
export default GamePage;

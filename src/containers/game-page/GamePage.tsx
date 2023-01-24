import { Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Keyboard from "../../components/keyboard/Keyboard";
import NavBar from "../../components/navbar/navbar";
import Row from "../../components/row/Row";
import { gameWonOrLostAtom } from "../../states/atoms";
import "./styles.css";

const GamePage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const gameWon = useRecoilValue<number>(gameWonOrLostAtom);

  useEffect(() => {
    if (gameWon===1 || gameWon===2) setOpen(true);
  }, [gameWon]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar />
      <div className="game-space">
        <div className="input-space">
          <div className="row-1">
            <Row thisRow={0} />
          </div>
          <div className="row-2">
            <Row thisRow={1} />
          </div>
          <div className="row-3">
            <Row thisRow={2} />
          </div>
          <div className="row-4">
            <Row thisRow={3} />
          </div>
          <div className="row-5">
            <Row thisRow={4} />
          </div>
          <div className="row-6">
            <Row thisRow={5} />
          </div>
        </div>
        <div className="keyboard">
          <Keyboard />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          message={gameWon===1 ? "Yayyyy! You Won" : "Better luck next time :("}
          onClose={handleClose}
        />
      </div>
    </>
  );
};
export default GamePage;

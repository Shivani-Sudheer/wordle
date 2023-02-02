import { Modal, Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import HighlightOffOutlined from "@mui/icons-material/HighlightOffOutlined";
import { useRecoilValue } from "recoil";

import "./styles.css";
import { gameWonOrLostAtom } from "../../states/atoms";

interface FinalModalProps {
  open: boolean;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  border: "none",
};

const FinalModal: FC<FinalModalProps> = ({ open }) => {
  const gameWonOrLost = useRecoilValue(gameWonOrLostAtom);

  const [seconds, setSeconds] = useState(60 - new Date().getSeconds());
  const [minutes, setMinutes] = useState(59 - new Date().getMinutes());
  const [hours, setHours] = useState(23 - new Date().getHours());
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const timeLeft = setInterval(() => {
      setSeconds(60 - new Date().getSeconds());
      setMinutes(59 - new Date().getMinutes());
      setHours(23 - new Date().getHours());
    }, 1000);
    return () => clearInterval(timeLeft);
  }, [seconds]);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={open && modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={style} id="modal-box">
          <HighlightOffOutlined
            sx={{
              color: "#808080a6",
              position: "relative",
              bottom: "34px",
              left: "225px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          {gameWonOrLost === 1 ? (
            <img src="trophy.png" alt="Trophy" id="trophy" />
          ) : (
            <img src="sad.png" alt="Sad face" id="sad-face" />
          )}
          <Typography id="modal-title">
            {gameWonOrLost === 1 ? "Congratulations!" : "Sorry!"}
          </Typography>
          <Typography sx={{ mt: 1.5 }}>
            {gameWonOrLost === 1
              ? "You are good at this."
              : "You have run out of guesses."}
          </Typography>
          <Typography>
            🌟 Your next !wordle starts in {hours}:{minutes}:{seconds} 🌟
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default FinalModal;

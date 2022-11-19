import { FC } from "react";
import { useRecoilState } from "recoil";
import { isDisableEnterAtom } from "../../states/atoms";
import KeyboardButton from "../keyboard-button/KeyboardButton";
import "./styles.css";

const Keyboard: FC = () => {
  const [isDisableEnter] = useRecoilState(isDisableEnterAtom);
  return (
    <>
    <div className="row1">
    <KeyboardButton text="Q"/>
    <KeyboardButton text="W"/>
    <KeyboardButton text="E"/>
    <KeyboardButton text="R"/>
    <KeyboardButton text="T"/>
    <KeyboardButton text="Y"/>
    <KeyboardButton text="U"/>
    <KeyboardButton text="I"/>
    <KeyboardButton text="O"/>
    <KeyboardButton text="P"/>
    </div>
    <div className="row2">
    <KeyboardButton text="A"/>
    <KeyboardButton text="S"/>
    <KeyboardButton text="D"/>
    <KeyboardButton text="F"/>
    <KeyboardButton text="G"/>
    <KeyboardButton text="H"/>
    <KeyboardButton text="J"/>
    <KeyboardButton text="K"/>
    <KeyboardButton text="L"/>
    </div>
    <div className="row3">
    <KeyboardButton text="ENTER" disableEnter={isDisableEnter}/>
    <KeyboardButton text="Z"/>
    <KeyboardButton text="X"/>
    <KeyboardButton text="C"/>
    <KeyboardButton text="V"/>
    <KeyboardButton text="B"/>
    <KeyboardButton text="N"/>
    <KeyboardButton text="M"/>
    <KeyboardButton text="DELETE"/>
    </div>
    </>
  );
};
export default Keyboard;

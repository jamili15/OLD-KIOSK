import { useKeyboardContext } from "../keyboard/KeyboardContext";
import {
  alphaRow1,
  alphaRow2,
  alphaRow3,
  alphaRow4,
  numSymRow1,
} from "./KeyboardData";
import KeyboardKey from "./KeyboardKey";

function Keyboard() {
  const context = useKeyboardContext();

  const alphaKeys = [numSymRow1, alphaRow1, alphaRow2, alphaRow3, alphaRow4];

  let keys = context.keyboardType === "alpha" ? alphaKeys : [];

  const handleSpaceBar = () => {
    if (context.activeInput && context.activeInput.current) {
      const cursorPosition = context.activeInput.current.selectionStart ?? 0;
      context.activeInput.current.value =
        context.activeInput.current.value.substring(0, cursorPosition) +
        " " +
        context.activeInput.current.value.substring(cursorPosition);
      context.activeInput.current.setSelectionRange(
        cursorPosition + 1,
        cursorPosition + 1
      );
    }
  };

  const handleClear = () => {
    if (context.activeInput && context.activeInput.current) {
      context.activeInput.current.value = "";
    }
  };

  const handleBackspace = () => {
    if (context.activeInput && context.activeInput.current) {
      const cursorPosition = context.activeInput.current.selectionStart ?? 0;
      const currentValue = context.activeInput.current.value;
      if (cursorPosition > 0) {
        context.activeInput.current.value =
          currentValue.substring(0, cursorPosition - 1) +
          currentValue.substring(cursorPosition);
        context.activeInput.current.setSelectionRange(
          cursorPosition - 1,
          cursorPosition - 1
        );
      }
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full text-2xl fixed left-0 bottom-[250px]"
    >
      {keys.map((row, index) => (
        <div key={index} className="flex justify-center m-4 ">
          {row.map((key) => (
            <KeyboardKey
              key={key.value}
              value={key.value}
              animation="shrink"
              onClick={
                key.value === "SpaceBar"
                  ? handleSpaceBar
                  : key.value === "Clear"
                  ? handleClear
                  : key.value === "Bks"
                  ? handleBackspace
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;

import { formatTitle } from "./format";
import { zustandStoreProps } from "./store";

type HandleTextFunctionProps = {
  userInput: string;
  keyCode: number;
} & zustandStoreProps;

export const handleText = ({
  text,
  arrayText,
  currentArrayTextCount,
  setArrayText,
  projects,
  keyCode,
  userInput,
}: HandleTextFunctionProps) => {
  if (userInput === "Enter") {
    const cd = text.split(" ")[0] === "cd" && text.split(" ")[2] === "-p";

    if (cd) {
      const getUrl = projects.find(
        (project) => formatTitle(project.name) === text.split(" ")[1]
      );

      if (getUrl !== undefined) {
        setTimeout(() => window.open(getUrl.demo, "_blank"), 1000);
      }
    }

    setArrayText();
    return { text: "" };
  }

  if (userInput === "ArrowUp" && currentArrayTextCount >= 0) {
    return {
      text: arrayText[currentArrayTextCount],
      currentArrayTextCount: currentArrayTextCount - 1,
    };
  }

  if (
    userInput === "ArrowDown" &&
    currentArrayTextCount < arrayText.length - 1
  ) {
    return {
      text: arrayText[currentArrayTextCount + 1],
      currentArrayTextCount: currentArrayTextCount + 1,
    };
  }

  if (userInput === "Backspace") {
    return { text: text.substring(0, text.length - 1) };
  }

  if (userInput === " " || userInput === "-") return { text: text + userInput };

  if (keyCode >= 48 && keyCode <= 90) return { text: text + userInput };
  return { text };
};

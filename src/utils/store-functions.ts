import { Project } from "types/project";
import { socialMediaLinks } from "./constants";
import { formatTitle } from "./format";
import { zustandStoreProps } from "./store";

export const isProjectExist = (projectName: string, projects: Project[]) => {
  const cdProject =
    projectName.split(" ")[0] === "cd" && projectName.split(" ")[2] === "-p";

  if (cdProject) {
    const _project = projects.find(
      (project) => formatTitle(project.name) === projectName.split(" ")[1]
    );

    if (_project !== undefined) {
      return _project;
    }

    return false;
  }
};

export const isSocialHandleExist = (socialName: string) => {
  const cdSocial =
    socialName.split(" ")[0] === "cd" && socialName.split(" ")[2] === "-s";

  if (cdSocial) {
    const social = socialMediaLinks.find(
      ({ name }) => formatTitle(name) === socialName.split(" ")[1]
    );

    if (social !== undefined) {
      return social;
    }

    return false;
  }
};

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
    const project = isProjectExist(text, projects);
    const social = isSocialHandleExist(text);

    if (project) {
      setTimeout(() => window.open(project.demo, "_blank"), 1000);
    } else if (social) {
      setTimeout(() => window.open(social.href, "_blank"), 1000);
    }

    setArrayText();
    return { text: "", currentArrayTextCount: arrayText.length };
  }

  if (userInput === "ArrowUp" && currentArrayTextCount >= 0) {
    return {
      text: arrayText[currentArrayTextCount],
      currentArrayTextCount: currentArrayTextCount - 1,
    };
  }

  if (
    userInput === "ArrowDown" &&
    currentArrayTextCount < arrayText.length - 2
  ) {
    return {
      text: arrayText[currentArrayTextCount + 2],
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

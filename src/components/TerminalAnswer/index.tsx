import { CommandLineFunctions } from "components/CommandLineFunctions";
import React from "react";
import { formatTitle } from "utils/format";
import { zustandStore } from "utils/store";

type Props = {
  userQuestion: string;
};

export const TerminalAnswer: React.FC<Props> = ({ userQuestion }) => {
  const { clearArrayText } = zustandStore();

  if (userQuestion === "clear") clearArrayText();

  const cd =
    userQuestion.split(" ")[0] === "cd" && userQuestion.split(" ")[2] === "-p";

  if (cd) {
    const { projects } = zustandStore();

    const project = projects.find(
      (_project) => formatTitle(_project.name) === userQuestion.split(" ")[1]
    );

    return (
      <p>
        {project
          ? `Redirected to project ${project.name}`
          : "Error: Project not found"}
      </p>
    );
  }

  const isQuestionExist = CommandLineFunctions.find(
    ({ functions, shortcut }) =>
      functions === userQuestion || shortcut === userQuestion
  );

  if (isQuestionExist) return <div>{isQuestionExist.description}</div>;

  return <p>bash: "{userQuestion}" command not found</p>;
};

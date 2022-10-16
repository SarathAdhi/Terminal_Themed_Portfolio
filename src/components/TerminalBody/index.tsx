import { TerminalAnswer } from "components/TerminalAnswer";
import React, { useEffect, useCallback } from "react";
import { zustandStore } from "utils/store";
import "./terminalBody.scss";

type PromptCompProps = {
  text: string;
  isPrevious?: boolean;
};

const PromptComp: React.FC<PromptCompProps> = ({
  text,
  isPrevious = false,
}) => (
  <div className="Prompt_wrapper">
    <span className="Prompt_user">
      sarath@ubuntu:<span className="Prompt_location">~</span>
      <span className="Prompt_dollar">$</span>
      <span className="Prompt_text">{text}</span>
      {!isPrevious && <span className="Prompt__cursor" />}
    </span>

    {isPrevious && <TerminalAnswer userQuestion={text} />}
  </div>
);

export const TerminalBox = () => {
  const { text, setText, arrayText } = zustandStore();

  const elementRef = React.useRef(null);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "v") {
        navigator.clipboard.readText().then((clipboard) => {
          setText(clipboard, e.keyCode);
        });

        return;
      }

      setText(e.key, e.keyCode);
    },
    [setText]
  );

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  useEffect(() => {
    // Scroll down to the bottom of the terminal
    // @ts-ignore
    elementRef.current.scrollIntoView();
  }, [arrayText, text]);

  return (
    <div className="Terminal_Body">
      <div className="Terminal_Intro">
        <p>
          {
            "Copyright (C) Sarath Terminal [Version 1.0.0]. All rights reserved."
          }
        </p>

        <p>
          Type <span>"help"</span> for more information. Type{" "}
          <span>"clear"</span> to clear the screen.
        </p>
      </div>

      {arrayText.map((text, index) => (
        <PromptComp
          key={text.replaceAll(" ", "-") + index}
          text={text}
          isPrevious
        />
      ))}

      <PromptComp text={text} />

      <div ref={elementRef} id="bottom" />
    </div>
  );
};

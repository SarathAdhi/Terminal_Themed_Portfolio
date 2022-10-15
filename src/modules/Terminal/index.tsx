import { TerminalBox } from "components/TerminalBody";
import { themeStore } from "utils/store";
import "./terminal.scss";

const TopTerminalBar = () => {
  const {
    isClosed,
    isMaximized,
    isMinimized,
    setIsClosed,
    setIsMaximized,
    setIsMinimized,
  } = themeStore();

  return (
    <div className="Terminal_Top">
      <button
        className="Terminal_Top_CloseBtn"
        onClick={() => setIsClosed(!isClosed)}
      >
        &#10005;
      </button>

      <button
        className="Terminal_Top_DummyBtn"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        &#9472;
      </button>

      <button
        className="Terminal_Top_DummyBtn"
        onClick={() => setIsMaximized(!isMaximized)}
      >
        &#9723;
      </button>
    </div>
  );
};

export const Terminal = () => {
  const { isClosed, isMaximized, isMinimized } = themeStore();

  return (
    <div
      className={`Terminal_Container ${isClosed && "closed"} ${
        isMaximized ? "maximized" : isMinimized && "minimized"
      }`}
    >
      <TopTerminalBar />
      <TerminalBox />
    </div>
  );
};

import { useEffect } from "react";
import "./App.scss";
import { Terminal } from "modules/Terminal";
import { zustandStore } from "utils/store";

const disableKeys = [
  "Space",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
];

const App = () => {
  const { fetchProjects } = zustandStore();

  useEffect(() => {
    window.addEventListener(
      "keydown",
      (e) => {
        if (disableKeys.includes(e.code)) {
          e.preventDefault();
        }
      },
      false
    );

    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="container">
      {/* <button onClick={() => document.getElementById("input")?.click()}>
        Open keyboard
      </button>

      <input id="input" style={{ display: "none" }} /> */}
      <Terminal />
    </div>
  );
};

export default App;

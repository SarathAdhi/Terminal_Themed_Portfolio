import { client } from "lib/client";
import { Project } from "types/project";
import create from "zustand";
import { handleText } from "./store-functions";

type ProjectStoreProps = {
  projects: Project[];
  fetchProjects: () => void;
};

export type zustandStoreProps = {
  text: string;
  clearText: () => void;
  clearArrayText: () => void;
  setText: (text: string, code: number) => void;
  arrayText: string[];
  currentArrayTextCount: number;
  setArrayText: () => void;
} & ProjectStoreProps;

export const zustandStore = create<zustandStoreProps>((set) => ({
  text: "",

  projects: [],

  fetchProjects: async () => {
    const projectsQuery = '*[_type == "projects"]';
    const project = await client.fetch(projectsQuery);
    set({ projects: project });
  },

  clearText: () => {
    set({ text: "" });
  },

  setText: (string, code) => {
    set((state) => handleText({ ...state, userInput: string, keyCode: code }));
  },

  arrayText: localStorage.getItem("arrayText")
    ? JSON.parse(localStorage.getItem("arrayText")!)
    : [],

  clearArrayText: () => {
    localStorage.removeItem("arrayText");

    set({ arrayText: [] });
  },

  currentArrayTextCount: 0,

  setArrayText: () => {
    set(({ text, arrayText }) => {
      const newArrayText = [...arrayText, text];

      localStorage.setItem("arrayText", JSON.stringify(newArrayText));

      return {
        currentArrayTextCount: arrayText.length,
        arrayText: newArrayText,
      };
    });
  },
}));

type ThemeStoreProps = {
  theme: string;
  setTheme: (theme: string) => void;
  isMaximized: boolean;
  setIsMaximized: (isMaximized: boolean) => void;
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
  isClosed: boolean;
  setIsClosed: (isClosed: boolean) => void;
};

export const themeStore = create<ThemeStoreProps>((set) => ({
  theme: "light",
  setTheme: (theme: string) => set({ theme }),

  isMaximized: false,
  setIsMaximized: (isMaximized: boolean) => set({ isMaximized }),

  isMinimized: false,
  setIsMinimized: (isMinimized: boolean) => set({ isMinimized }),

  isClosed: false,
  setIsClosed: (isClosed: boolean) => set({ isClosed }),
}));

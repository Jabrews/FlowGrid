import { create } from "zustand";

type NoteNavigatorStore = {
  showNavMenu: boolean;
  toggleShowNavMenu: (newToggle: boolean) => void;

  activeFolderName: string;
  setActiveFolderName: (newName: string) => void;

  activeNoteName: string;
  setActiveNoteName: (newName: string) => void;

  showFolderPannel: boolean;
  toggleShowFolderPannel: (newToggle: boolean) => void;
};

export const useNoteNavigatorStore = create<NoteNavigatorStore>((set) => ({
  showNavMenu: false,
  toggleShowNavMenu: (newBool: boolean) =>
    set((s) => ({
      ...s,
      showNavMenu: newBool,
    })),

  activeFolderName: "Test",
  setActiveFolderName: (newName: string) =>
    set((s) => ({
      ...s,
      activeFolderName: newName,
    })),

activeNoteName: "Test",
  setActiveNoteName: (newName: string) =>
    set((s) => ({
      ...s,
      activeNoteName: newName,
    })),

showFolderPannel : true,
toggleShowFolderPannel : (newBool : boolean) =>
  set((s) => ({
    ...s,
    showFolderPannel : newBool,
  }))


}));



// custom hooks

export const useShowNavMenu = () =>
  useNoteNavigatorStore((s) => s.showNavMenu);

export const useToggleShowNavMenu = () =>
  useNoteNavigatorStore((s) => s.toggleShowNavMenu);

export const useActiveFolderName = () =>
  useNoteNavigatorStore((s) => s.activeFolderName);

export const useSetActiveFolderName = () =>
  useNoteNavigatorStore((s) => s.setActiveFolderName);

export const useActiveNoteName = () =>
  useNoteNavigatorStore((s) => s.activeNoteName);

export const useSetActiveNoteName = () =>
  useNoteNavigatorStore((s) => s.setActiveNoteName);

export const useShowFolderPannel = () =>
  useNoteNavigatorStore((s) => s.showFolderPannel) 

export const useToggleShowFolderPannel = () =>
  useNoteNavigatorStore((s) => s.toggleShowFolderPannel) 








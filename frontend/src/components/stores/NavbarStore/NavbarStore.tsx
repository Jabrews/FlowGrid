import { create } from "zustand";

type NavbarStore = {
    activeFolder : string,
    activeProject: string
    setActiveFolder : (folder : string) => void
    setActiveProject: (project: string) => void

}


export const useNavbarStore = create<NavbarStore>((set) => ({
    activeFolder : 'test',
    activeProject: 'test',
    setActiveFolder: (folder: string) => set((s) => ({
        ...s,
        activeFolder: folder 
    })),
    setActiveProject: (project : string) => set((s) => ({
        ...s,
        activeProject : project 
    }))



}))

export const useActiveProject= () => 
    useNavbarStore((s) => s.activeProject) 

export const useSetActiveProject= () => 
    useNavbarStore((s) => s.setActiveProject) 

export const useActiveFolder= () =>
    useNavbarStore((s) => s.activeFolder)

export const useSetActiveFolder= () =>
    useNavbarStore((s) => s.setActiveFolder)
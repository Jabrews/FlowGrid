import { create } from "zustand";

type NavbarStore = {
    activeUrl : string
    setActiveUrl : (newUrl : string) => void

}


export const useNavbarStore = create<NavbarStore>((set) => ({
    activeUrl : '',
    setActiveUrl : (newUrl) => set((s) => ({
        ...s,
        activeUrl : newUrl
    }))



}))

export const useActiveUrl = () => 
    useNavbarStore((s) => s.activeUrl) 

export const useSetActiveUrl = () => 
    useNavbarStore((s) => s.setActiveUrl) 
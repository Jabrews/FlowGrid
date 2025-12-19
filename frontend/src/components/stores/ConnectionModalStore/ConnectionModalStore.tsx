import {create} from 'zustand'



type ConnectionModalStore = {
    activeConnectionItemI : string // setters in connection input & output
    setActiveConnectionItemI : (newI : string) => void
}


export const useConnectionModalStore = create<ConnectionModalStore>((set) => ({
    activeConnectionItemI : '',
    setActiveConnectionItemI : (newI : string) =>
        set((s) => ({
            ...s,
            activeConnectionItemI : newI
        }))



}))



export const useActiveConnectionItemI = () =>
    useConnectionModalStore((s) => s.activeConnectionItemI)

export const useSetActiveConnectionItemI = () =>
    useConnectionModalStore((s) => s.setActiveConnectionItemI)




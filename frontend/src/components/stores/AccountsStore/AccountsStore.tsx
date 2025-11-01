import {create} from 'zustand'

type UserStore = {
  isAuth: boolean;
  userName : string;
  isGuest : boolean;
  actions: {
    toggleIsAuth: (newBool: boolean) => void;
    setUserName: (newUserName: string) => void;
    toggleIsGuest : (newBool : boolean) => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  isAuth: false,
  userName : '',
  isGuest : false,
  actions: {
    toggleIsAuth: (newBool: boolean) =>
      set((state) => ({
        ...state,
        isAuth: newBool
      })),
    setUserName: (newUserName: string) =>
      set((state) => ({
        ...state,
        userName: newUserName
      })),
    toggleIsGuest : (newBool : boolean) => 
      set((state) => ({
        ...state,
        isGuest : newBool
      }))
  },
}));


// state
export const useIsAuth = () => {
   return useUserStore((s) => s.isAuth)
}

export const useUserName = () => {
    return useUserStore((s) => s.userName)
}

export const useIsGuest = () => {
  return useUserStore((s) => s.isGuest)
}

// actions
export const useToggleIsAuth = () =>
  useUserStore((s) => s.actions.toggleIsAuth);

export const useSetUserName = () =>
  useUserStore((s) => s.actions.setUserName)

export const useToggleIsGuest = () => 
  useUserStore((s) => s.actions.toggleIsGuest)
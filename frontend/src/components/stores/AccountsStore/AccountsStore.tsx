import {create} from 'zustand'

type UserStore = {
  isAuth: boolean;
  userName : string;
  actions: {
    toggleIsAuth: (newBool: boolean) => void;
    setUserName: (newUserName: string) => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  isAuth: false,
  userName : '',
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
  },
}));


// state
export const useIsAuth = () => {
   return useUserStore((s) => s.isAuth)
}

export const useUserName = () => {
    return useUserStore((s) => s.userName)
}

// actions
export const useToggleIsAuth = () =>
  useUserStore((s) => s.actions.toggleIsAuth);

export const useSetUserName = () =>
  useUserStore((s) => s.actions.setUserName)


import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = {
  isLogin: boolean;
  id: number;
  email: string;
  role: string;
  nation: string;
  accessToken: string;
  isLoading: boolean;
  isPasswordSet: boolean;
  isNewAnnouncement: number;
  isAnnouncementCached: number;
};

type Action =
  | { type: "LOGIN"; authState: State }
  | { type: "LOGOUT"; authState: State }
  | { type: "FINISHLOADING"; authState: State }
  | { type: "CACHEANNOUNCEMENT"; authState: State }
  | { type: "NOTCACHEANNOUNCEMENT"; authState: State };

type AuthDispatch = Dispatch<Action>;

const AuthStateContext = createContext<State | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

// reducer

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        id: action.authState.id,
        role: action.authState.role,
        email: action.authState.email,
        nation: action.authState.nation,
        accessToken: action.authState.accessToken,
        isPasswordSet: action.authState.isPasswordSet,
        isLoading: action.authState.isLoading,
        isNewAnnouncement: action.authState.isNewAnnouncement,
        isAnnouncementCached: action.authState.isAnnouncementCached,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        id: 0,
        email: "",
        role: "guest",
        nation: "",
        accessToken: "",
        isLoading: false,
        isNewAnnouncement: 1,
        isAnnouncementCached: 0,
      };

    case "FINISHLOADING":
      return {
        ...state,
        isLoading: false,
      };
    case "CACHEANNOUNCEMENT":
      return {
        ...state,
        isAnnouncementCached: 1,
      };
    case "NOTCACHEANNOUNCEMENT":
      return {
        ...state,
        isAnnouncementCached: 0,
      };

    default:
      throw new Error("reducer: Unhandled Action");
  }
}

// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    id: 0,
    email: "",
    role: "guest",
    accessToken: "",
    nation: "",
    isPasswordSet: false,
    isLoading: true,
    isNewAnnouncement: 1,
    isAnnouncementCached: 0,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useAuthState(): State {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error("Cannot find AuthProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error("Cannot find AuthProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

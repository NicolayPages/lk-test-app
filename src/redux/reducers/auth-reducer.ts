import { ThunkAction } from "redux-thunk";
import authAPI from "../../api/auth-api";
import { mockType, UserType } from "../../types/types";
import { AppStateType, InferActionsTypes } from "../redux";

const initialState = {
  isFetching: false,
  isAuth: false,
  user: {} as UserType,
  errorMessage: "",
};

type initialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>;

const authReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  switch (action.type) {
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "TOGGLE_IS_AUTH": {
      return {
        ...state,
        isAuth: action.isAuth,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        errorMessage: action.error,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  toggleIsAuth: (isAuth: boolean) =>
    ({ type: "TOGGLE_IS_AUTH", isAuth } as const),
  setUser: (user: UserType) => ({ type: "SET_USER", user } as const),
  setError: (error: string) => ({ type: "SET_ERROR", error } as const),
};


export const loginUser =
  (username: string, password: string): ThunkType =>
    async (dispatch) => {
      try {
        dispatch(actions.toggleIsFetching(true));
        const response = await authAPI.getUsers();
        const mockUser = response.data.find(
          (user: mockType) =>
            user.username === username && user.address.zipcode === password
        );
        if (mockUser) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("username", mockUser.username);
          dispatch(actions.setUser(mockUser));
          dispatch(actions.toggleIsAuth(true));
        } else {
          dispatch(actions.setError("Incorrect username or password"));
        }
        dispatch(actions.toggleIsFetching(false));
      } catch (error) {
        dispatch(actions.setError("Some server error"));
      }
    };

export const logoutUser = (): ThunkType => async (dispatch) => {
  localStorage.removeItem("auth");
  localStorage.removeItem("username");
  dispatch(actions.setUser({} as UserType));
  dispatch(actions.toggleIsAuth(false));
};

export default authReducer;

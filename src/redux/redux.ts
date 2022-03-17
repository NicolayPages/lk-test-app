import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import contactsReducer from "./reducers/contacts-reducer";
import authReducer from "./reducers/auth-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppStateType } from "../redux/redux";

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

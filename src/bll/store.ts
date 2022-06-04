import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profileReducer";
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk'
import {authReducer} from "./authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./appReducers";
import { cardReducer } from "./cardReducer";


export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store
export type RootReducerType = any

const rootReducer = combineReducers({
    profileReducer: profileReducer,
    authReducer: authReducer,
    appReducer: appReducer,
    cardReducer: cardReducer,
})

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, RootReducerType>>()
export type AppThunk<T = void> = ThunkAction<T, AppStateType, unknown, RootReducerType>

export let store = createStore(rootReducer, applyMiddleware(thunk))


//@ts-ignore
window.store = store;
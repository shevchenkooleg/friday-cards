import {applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {profileReducer} from "./profileReducer";
import thunk from 'redux-thunk'
import {authReducer} from "./authReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store

const rootReducer = combineReducers({
    profileReducer: profileReducer,
    authReducer: authReducer,
})
export let store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

//@ts-ignore
window.store = store;
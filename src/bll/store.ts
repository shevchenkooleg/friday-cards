import {applyMiddleware, combineReducers, createStore } from "redux";
import {profileReducer} from "./profileReducer";
import thunk from 'redux-thunk'
import {authReducer} from "./authReducer";


export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store

const rootReducer = combineReducers({
    profileReducer: profileReducer,
    authReducer: authReducer,
})
export let store = createStore(rootReducer, applyMiddleware(thunk))


//@ts-ignore
window.store = store;
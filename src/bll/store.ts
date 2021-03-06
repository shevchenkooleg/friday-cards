import {applyMiddleware, combineReducers, compose} from "redux";
import { legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profileReducer";
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk'
import {authReducer} from "./authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./appReducers";
import { cardPacksReducer } from "./cardPacksReducer";
import {packReducer} from "./packReducer";


export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = typeof store
export type RootReducerType = any

const rootReducer = combineReducers({
    profileReducer: profileReducer,
    authReducer: authReducer,
    appReducer: appReducer,
    cardPacksReducer: cardPacksReducer,
    singlePackReducer: packReducer,
})

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType, unknown, RootReducerType>>()
export type AppThunk<T = void> = ThunkAction<T, AppStateType, unknown, RootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// export let store = createStore(rootReducer, applyMiddleware(thunk))


//@ts-ignore
window.store = store;
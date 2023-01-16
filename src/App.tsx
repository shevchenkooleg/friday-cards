import React, {useEffect} from 'react';
import './App.css';
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from './components/Navbar/Navbar';
import Error404 from "./components/Error404/Error404";
import {TestPage} from "./components/Test/TestPage";
import {SignUp} from "./components/Login/SignUp";
import {SignIn} from "./components/Login/SignIn";
import {RestorePass} from "./components/Login/RestorePass";
import {UpdatePass} from "./components/Login/UpdatePass";
import {AppStateType, useAppDispatch} from "./bll/store";
import {initializeAppTC} from "./bll/appReducers";
import {useSelector} from "react-redux";
import {Loader} from './components/common/Loader/Loader';
import Profile from './components/Profile/Profile';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import SettingsMenu from "./components/Profile/Profile_Settings/SettingsMenu";
import CardPacks from "./components/CardPacks/CardPacks";
import Cards from "./components/Cards/Cards";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import LearnPage from "./components/LearnPage/LearnPage";
import RandomSettings from './components/LearnPage/RandomSettings/RandomSettings';

export const PATH = {
    PROFILE: {
        MAIN: '/profile',
        SETTINGS: '/settings',
        EDIT: '/profile/edit'
    },
    LOGIN: {
        SIGN_IN: '/sign_in',
        SIGN_UP: '/sign_up',
        RESTORE_PASS: '/restore_pass',
        UPDATE_PASS: '/update_pass/:token',
    },
    CARD: {
        PACKS: '/cards_packs',
        CARD_LIST: '/card-list',
        CARD_LIST_EDIT: '/card-list-edit',
    },
    TESTING_PAGE: '/test',
    LEARNING_PAGE: {
        MAIN: '/learn',
        RANDOM_SETTINGS: '/learn/settings',
    },
}

function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useSelector((state: AppStateType)=>state.appReducer.initialized)
    // const searchSettings = useAppSelector<SearchSettingsType>(state => state.cardPacksReducer.searchSettings)
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[dispatch])
    return (
        <HashRouter>
            <ErrorSnackbar/>
            <div className="App">
                <nav className='Nav'>
                    <Navbar/>
                </nav>
                {isInitialized ?
                    <div>
                        <Routes>
                            <Route path={'/'} element={<Navigate to={PATH.PROFILE.MAIN}/>}/>
                            <Route path={PATH.PROFILE.MAIN} element={<Profile/>}/>
                            <Route path={PATH.TESTING_PAGE} element={<TestPage/>}/>
                            <Route path={PATH.LOGIN.SIGN_UP} element={<SignUp/>}/>
                            <Route path={PATH.LOGIN.SIGN_IN} element={<SignIn/>}/>
                            <Route path={PATH.PROFILE.SETTINGS} element={<SettingsMenu/>}/>
                            <Route path={PATH.LOGIN.RESTORE_PASS} element={<RestorePass/>}/>
                            <Route path={PATH.LOGIN.UPDATE_PASS} element={<UpdatePass/>}/>
                            <Route path={PATH.CARD.PACKS} element={<CardPacks/>}/>
                            <Route path={PATH.CARD.CARD_LIST + '/:pack_ID'} element={<Cards/>}/>
                            <Route path={PATH.CARD.CARD_LIST_EDIT + '/:pack_ID'} element={<Cards edit={true}/>}/>
                            <Route path={PATH.PROFILE.EDIT} element={<EditProfile/>}/>
                            <Route path={PATH.LEARNING_PAGE.MAIN} element={<LearnPage/>}/>
                            <Route path={PATH.LEARNING_PAGE.RANDOM_SETTINGS} element={<RandomSettings/>}/>


                            <Route path='/*' element={<Error404/>}/>
                        </Routes>
                    </div>
                    : <Loader/>}
            </div>

        </HashRouter>

    );
}

export default App;


// "homepage": "https://shevchenkooleg.github.io/friday-cards",

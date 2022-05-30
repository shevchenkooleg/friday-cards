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
import { Loader } from './components/common/Loader/Loader';
import Profile from './components/Profile/Profile';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';

export const PATH = {
    PROFILE: '/profile',
    LOGIN: {
        SIGN_IN: '/sign_in',
        SIGN_UP: '/sign_up',
        RESTORE_PASS: '/restore_pass',
        UPDATE_PASS: '/update_pass',
    },
    TESTING_PAGE: '/test'
}

function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useSelector((state: AppStateType)=>state.appReducer.initialized)

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
                                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                                <Route path={PATH.PROFILE} element={<Profile/>}/>
                                <Route path={PATH.TESTING_PAGE} element={<TestPage/>}/>
                                <Route path={PATH.LOGIN.SIGN_UP} element={<SignUp/>}/>
                                <Route path={PATH.LOGIN.SIGN_IN} element={<SignIn/>}/>
                                <Route path={PATH.LOGIN.RESTORE_PASS} element={<RestorePass/>}/>
                                <Route path={PATH.LOGIN.UPDATE_PASS} element={<UpdatePass/>}/>
                                <Route path='/*' element={<Error404/>}/>
                            </Routes>
                        </div>
                            : <Loader/> }
                    </div>

        </HashRouter>

    );
}

export default App;

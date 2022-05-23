import React from 'react';
import './App.css';
import {Profile} from "./components/Profile/Profile";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navbar} from './components/Navbar/Navbar';
import Error404 from "./components/Error404/Error404";
import {TestPage} from "./components/Test/TestPage";
import {SignUp} from "./components/Login/SignUp";
import {SignIn} from "./components/Login/SignIn";
import {RestorePass} from "./components/Login/RestorePass";
import {UpdatePass} from "./components/Login/UpdatePass";

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
    return (
        <HashRouter>
            <div className="App">
                <nav className='Nav'>
                    <Navbar/>
                </nav>
                <div>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={PATH.TESTING_PAGE}/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}/>
                        <Route path={PATH.TESTING_PAGE} element={<TestPage/>}/>
                        <Route path={PATH.LOGIN.SIGN_UP} element={<SignUp/>}/>
                        <Route path={PATH.LOGIN.SIGN_IN} element={<SignIn/>}/>
                        <Route path={PATH.LOGIN.RESTORE_PASS} element={<RestorePass/>}/>
                        <Route path={PATH.LOGIN.UPDATE_PASS} element={<UpdatePass/>}/>
                        <Route path='/*' element={<Error404/>}/>
                    </Routes>
                </div>

            </div>
        </HashRouter>

    );
}

export default App;

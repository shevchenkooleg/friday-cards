import React from 'react'
import s from './Error404.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
// import {PATH} from "../Pages";

function Error404() {
    return (
        <div className={s.content}>
            <div className={s.error}>
                <div>This page does not exist.</div>
                <div>...or does it?</div>
                <div className={s.link}>Try the <NavLink to={PATH.TESTING_PAGE}>homepage</NavLink>.</div>
            </div>
            <img src="https://bench.co/gifs/bigfoot.gif" alt=""/>
        </div>
    )
}

export default Error404

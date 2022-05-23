import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";

export const Return = () => {
    return (
        <div>
            <NavLink to={PATH.TESTING_PAGE}>Try return back...</NavLink>
        </div>
    );
};
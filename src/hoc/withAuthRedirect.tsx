import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {AppStateType} from "../bll/store";


type mapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {
    function RedirectComponent(props: mapStateToPropsType) {
        let {isAuth, ...restProps} = props
        if (!isAuth) {
            return <Navigate to={'/sign_in'}/>}
        if (isAuth) {
            return <Component {...restProps as T}/>}



        return <Component {...restProps as T}/>
    }

    return connect(mapStateToProps)(RedirectComponent)
}
import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperSelect from "../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../common/c6-SuperRadio/SuperRadio";
import {PATH} from "../../App";
import {Navigate} from "react-router-dom";
import s from './TestPage.module.css'
import {pingServerTC} from "../../bll/authReducer";
import {useAppDispatch} from "../../bll/store";

export const TestPage = () => {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState(false)
    const [option, setOption] = useState(PATH.TESTING_PAGE)
    const dispatch = useAppDispatch()

    const pages = [
        PATH.PROFILE,
        PATH.TESTING_PAGE,
        PATH.LOGIN.SIGN_IN,
        PATH.LOGIN.SIGN_UP,
        PATH.LOGIN.RESTORE_PASS,
        PATH.LOGIN.UPDATE_PASS,
        '/error page'
    ]


    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        setInputValue('')
        try {
            if (!error) {
                alert('You are already try to change your password to "' + inputValue + '" value')
            } else {
                alert('please, check the console...')
                throw new Error('You are already throw an Error with "' + inputValue + '" value')

            }
        } catch (e) {
            console.log(e)
        }

    }
    const onCheckboxChangeHandler = () => {
        setError(!error)
    }
    const onSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setOption(e.currentTarget.value)
    }
    const onRadioChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setOption(e.currentTarget.value)
    }
    const pingHandler = () => {
        dispatch(pingServerTC())
    }


    if (option === PATH.TESTING_PAGE) {
        return (
            <div className={s.content}>
                Testing page
                <hr/>
                <div>Change password form</div>

                <SuperInputText placeholder={'Enter new password'} value={inputValue}
                                onChange={onInputChangeHandler}/>
                <SuperButton children={'Submit'} onClick={onButtonClickHandler}/>
                <div>
                    <SuperCheckbox checked={error} children={'raise an Error?'} onChange={onCheckboxChangeHandler}/>
                </div>
                <hr/>
                <div className={s.switchPageArea}>
                    <div className={s.selectArea}>
                        <SuperSelect options={pages} value={option} onChange={onSelectChangeHandler}/>
                    </div>
                    <div className={s.radioArea}>
                        <SuperRadio options={pages} value={option} onChange={onRadioChangeHandler}/>
                    </div>
                </div>
                <SuperButton children={'Ping'} onClick={pingHandler}/>
                <hr/>
            </div>
        );
    } else {
        return <Navigate to={option}></Navigate>
    }
};
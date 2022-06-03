import React from 'react';
import s from "./SignUp.module.css";
import {Loader} from "../common/Loader/Loader";
import mailBox from "../../assets/pngwing.com.png";
import {useAppSelector} from "../../bll/store";
import {RequestStatusType} from "../../bll/appReducers";

const MailBoxMessage = () => {

    const status = useAppSelector<RequestStatusType>(state => state.appReducer.status)

    return (
            <>
                {status === 'loading' && <Loader/>}
                <div className={s.container}>
                    <h2>Check your mailbox</h2>
                    <img src={mailBox} alt="loader" className={s.mailBox}/>

                </div>
            </>
    );
};

export default MailBoxMessage;
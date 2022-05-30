import React from 'react';
import loader from "../../../assets/loadingCard.gif";
import s from './Loader.module.css'


export const Loader = () => {
    return (
        <div className={s.container}>
            <img src={loader} alt="loader" className={s.loader}/>
        </div>
    );
};



// style={{width:'300px',display: 'flex', margin: '0 auto', marginTop: '30vh'}} 
import React from 'react';
import loader from "../../../assets/loadingCard.gif";


export const Loader = () => {
    return (
        <div>
            <img style={{width:'300px',display: 'flex', margin: '0 auto', marginTop: '30vh'}} src={loader} alt="loader"/>
        </div>
    );
};

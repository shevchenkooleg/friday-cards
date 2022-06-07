import React from 'react';
import s from "./Cards.module.css";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';
import PackTable from "./CardTable/PackTable";

const Cards = () => {

    return (
        <div className={s.container}>
            <h2>Pack name</h2>
            <SearchCardBlock/>
            <PackTable/>
        </div>
    );
};

export default Cards;
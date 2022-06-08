import React from 'react';
import StarIcon from '@material-ui/icons/Star'; // заполнена
import StarBorderIcon from '@material-ui/icons/StarBorder'; // пустая
import StarHalfIcon from '@material-ui/icons/StarHalf'; // половина
type StarPropsType = {
    selected?: boolean
    half?: boolean
}


export const Star = ({selected, half}: StarPropsType) => {
    return <span>{half ? <StarHalfIcon/> : selected ? <StarIcon/> :<StarBorderIcon/>}</span>
};


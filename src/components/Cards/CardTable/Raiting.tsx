import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type StarProps = {
    grade: number
}
type StarType = {
    flag: boolean
}
export const Star = ({flag}: StarType) => {
    return (
        (flag)
            ? <span><StarIcon/></span>
            : <span><StarBorderIcon/></span>

    )
}
export const Raiting = ({}) => {
    return (
        <div>

        </div>
    );
};


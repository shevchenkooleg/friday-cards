import React from 'react';
import {Star} from './Star';

type RatingPropsType = {
    rating: number
}
export const Rating = ({rating}: RatingPropsType) => {
    return (
        <div>
            <Star selected={rating > 0} half={rating > 0 && rating < 1}/>
            <Star selected={rating > 1} half={rating > 1 && rating < 2}/>
            <Star selected={rating > 2} half={rating > 2 && rating < 3}/>
            <Star selected={rating > 3} half={rating > 3 && rating < 4}/>
            <Star selected={rating > 4} half={rating > 4 && rating < 5}/>
        </div>
    );
};


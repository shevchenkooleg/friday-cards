import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {setUserIDForSearchAC} from "../../../bll/cardPacksReducer";

const OwnCardsSelector = () => {

    const dispatch = useAppDispatch()
    const Id = useAppSelector<string>((state)=>state.profileReducer.userData.id)
    const userIdForSearch = useAppSelector<string>((state)=>state.cardPacksReducer.searchSettings.user_id)

    type ButtonType = 'my' | 'all'

    const onButtonClickHandler = (type: ButtonType)=>{
        if (type === 'my') {
            dispatch(setUserIDForSearchAC(Id))
        } else if (type === 'all') {
            dispatch(setUserIDForSearchAC(''))
        }
    }

    return (
        <div>
            <h4>Show packs cards</h4>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button sx={{width:'120px'}} disabled={!!userIdForSearch} onClick={()=>onButtonClickHandler('my')}>My</Button>
                <Button sx={{width:'120px'}} disabled={!userIdForSearch} onClick={()=>onButtonClickHandler('all')}>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnCardsSelector;
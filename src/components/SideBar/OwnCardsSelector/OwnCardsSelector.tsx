import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {setUserIDForSearchAC} from "../../../bll/cardPacksReducer";
import {RequestStatusType} from "../../../bll/appReducers";

const OwnCardsSelector = () => {

    const dispatch = useAppDispatch()
    const Id = useAppSelector<string>((state)=>state.profileReducer.userData.id)
    const userIdForSearch = useAppSelector<string>((state)=>state.cardPacksReducer.searchSettings.user_id)
    type ButtonType = 'my' | 'all'
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)


    const onButtonClickHandler = (type: ButtonType)=>{
        if (type === 'my') {
            dispatch(setUserIDForSearchAC(Id))
        } else if (type === 'all') {
            dispatch(setUserIDForSearchAC(''))
        }
    }

    return (
        <div>
            <h4 style={{margin:'20px 0 20px 0'}}>Show packs cards</h4>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button sx={{width:'120px'}} disabled={!!userIdForSearch || appStatus==='loading'} onClick={()=>onButtonClickHandler('my')}>My</Button>
                <Button sx={{width:'120px'}} disabled={!userIdForSearch || appStatus==='loading'} onClick={()=>onButtonClickHandler('all')}>All</Button>
            </ButtonGroup>
        </div>
    );
};

export default OwnCardsSelector;
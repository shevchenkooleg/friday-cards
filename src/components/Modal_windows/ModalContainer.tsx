import React from 'react';
import s from "../Cards/Cards.module.css";
import {Button, TextField} from "@mui/material";
import Modal from "./Modal";

interface IModalContainer {
    show: boolean,
    setShow: (show:boolean)=>void
    title1?: string | undefined
    title2?: string | undefined
    onChange1?: (title1: string )=>void
    onChange2?: (title2: string )=>void
    onClick1?:()=>void
    onClick2?:()=>void
}
const ModalContainer:React.FC<IModalContainer> = ({
    show,
    setShow,
    onChange1,
    onChange2,title1,title2,
    onClick1,
    onClick2,
                                                  }) => {
    return (
        <Modal show={show} setShow={setShow}>
            <div className={s.modalContainer}>
                <p className={s.modalTitle}>Add new <span className={s.modalMainWord}>question</span></p>
                <TextField
                    onChange={()=> {
                      onChange1 && title1 && onChange1(title1)
                    }}
                    sx={{marginTop: '20px'}}
                    id="filled-multiline-static"
                    label="Question"
                    multiline
                    rows={4}
                    defaultValue={title1}
                    value={title1}
                    variant="filled"/>
                <TextField
                    onChange={()=> {
                        onChange2 && title2 && onChange2(title2)
                    }}
                    sx={{marginTop: '20px'}}
                    id="filled-multiline-static"
                    label="Answer"
                    multiline
                    rows={4}
                    defaultValue={title2}
                    value={title2}
                    variant="filled"/>
                <div className={s.modalButtons}>
                    <Button onClick={onClick1} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={onClick2} variant="contained" color="success">Save</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalContainer;
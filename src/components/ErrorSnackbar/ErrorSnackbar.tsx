import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {RequestStatusType, setAppError, setAppStatus} from '../../bll/appReducers';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {

    const error = useAppSelector<string | null>((state)=>state.appReducer.error)
    const status = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)
    const dispatch = useAppDispatch()

    const handleErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError(null))
    };
    const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppStatus('idle'))
    };

    return (
        <>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                    {error} 😠
                </Alert>
            </Snackbar>
            <Snackbar open={status === 'succeeded'} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{width: '100%'}}>
                    {status} 😁
                </Alert>
            </Snackbar>
        </>

    )}


import React from 'react';
import s from './RandomSettings.module.css'
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../App";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {RandomSettingsType, setRandomSettings} from "../../../bll/packReducer";

const RandomSettings = () => {

    const navigate = useNavigate()
    const isAuth = useAppSelector<boolean>(state => state.authReducer.isAuth)
    const randomSettings = useAppSelector<RandomSettingsType>((state) => state.singlePackReducer.randomSettings)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            totalAmount: randomSettings.totalAmount,
            fourStar: randomSettings.fourStarCardsPercent,
            threeStar: randomSettings.threeStarCardsPercent,
            twoStar: randomSettings.twoStarCardsPercent,
            oneStar: (100 - (randomSettings.threeStarCardsPercent + randomSettings.fourStarCardsPercent + randomSettings.twoStarCardsPercent)),
        },
        // validationSchema: LoginValidationSchema,
        validationSchema: undefined,
        onSubmit: (values, actions) => {
            const totalAmount = values.totalAmount
            const fourStarCardsPercent = values.fourStar
            const threeStarCardsPercent = values.threeStar
            const twoStarCardsPercent = values.twoStar
            // const oneStarCardsPercent = values.oneStar
            dispatch(setRandomSettings({totalAmount, fourStarCardsPercent, threeStarCardsPercent, twoStarCardsPercent}))
            if (isAuth) {
                navigate('/')
            }
            actions.resetForm({
                values: {
                    totalAmount: randomSettings.totalAmount,
                    fourStar: randomSettings.fourStarCardsPercent,
                    threeStar: randomSettings.threeStarCardsPercent,
                    twoStar: randomSettings.twoStarCardsPercent,
                    oneStar: (100 - (randomSettings.threeStarCardsPercent + randomSettings.fourStarCardsPercent + randomSettings.twoStarCardsPercent))
                }
            })
        }
    })


    return (
        <div className={s.container}>
            <h2>Random settings</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form}>
                    <TextField
                        {...formik.getFieldProps('totalAmount')}
                        size='small'
                        type="string"
                        label="Total amount"
                        sx={{margin: '10px', width: '204px'}}
                        // error={!!formik.errors.email && formik.touched.email}
                        // helperText={formik.touched.email ? formik.errors.email : null}
                    />
                    <TextField
                        {...formik.getFieldProps('fourStar')}
                        size='small'
                        type="string"
                        label="FourStar in percent"
                        sx={{margin: '10px', width: '204px'}}
                        // error={!!formik.errors.email && formik.touched.email}
                        // helperText={formik.touched.email ? formik.errors.email : null}
                    />
                    <TextField
                        {...formik.getFieldProps('threeStar')}
                        size='small'
                        type="string"
                        label="ThreeStar in percent"
                        sx={{margin: '10px', width: '204px'}}
                        // error={!!formik.errors.email && formik.touched.email}
                        // helperText={formik.touched.email ? formik.errors.email : null}
                    />
                    <TextField
                        {...formik.getFieldProps('twoStar')}
                        size='small'
                        type="string"
                        label="TwoStar in percent"
                        sx={{margin: '10px', width: '204px'}}
                        // error={!!formik.errors.email && formik.touched.email}
                        // helperText={formik.touched.email ? formik.errors.email : null}
                    />
                    <TextField
                        {...formik.getFieldProps('oneStar')}
                        size='small'
                        type="string"
                        label="OneStar in percent"
                        sx={{margin: '10px', width: '204px'}}
                        disabled={true}
                        // error={!!formik.errors.email && formik.touched.email}
                        // helperText={formik.touched.email ? formik.errors.email : null}
                    />


                    {/*<TextField*/}
                    {/*    {...formik.getFieldProps('password')}*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="end">*/}
                    {/*                {!showHide*/}
                    {/*                    ? <VisibilityIcon onClick={onClickShowPassword}/>*/}
                    {/*                    : <VisibilityOffIcon onClick={onClickShowPassword}/>}*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*    className={s.passwordField}*/}
                    {/*    sx={{width: '204px'}}*/}
                    {/*    size='small'*/}
                    {/*    type={showHide ? 'text' : 'password'}*/}
                    {/*    label="Password"*/}
                    {/*    error={!!formik.errors.password && formik.touched.password}*/}
                    {/*    helperText={formik.touched.password ? formik.errors.password : null}*/}
                    {/*/>*/}

                    <div className={s.buttons}>
                        <Button variant='contained' sx={{marginRight: '30px', width: '80px'}} onClick={() => {
                            navigate(PATH.CARD.PACKS)
                        }}>
                            Back
                        </Button>
                        <Button variant='contained' type="reset" onClick={formik.handleReset}
                                sx={{marginRight: '30px', width: '80px'}}>
                            Cancel
                        </Button>
                        <Button variant='contained' type='submit' sx={{width: '80px'}}>
                            Apply
                        </Button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default RandomSettings;
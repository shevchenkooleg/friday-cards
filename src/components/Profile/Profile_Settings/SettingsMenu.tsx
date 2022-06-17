import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useNavigate} from "react-router-dom";
import {PATH} from '../../../App';
import s from './Settings.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";



export const SettingsMenu = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const navigate = useNavigate();
    const onClickUpdatePassword = () => {
        navigate(PATH.LOGIN.RESTORE_PASS)
    }
    const onClickChangeRandomSettings = () => {
        navigate(PATH.LEARNING_PAGE.RANDOM_SETTINGS)
    }


    return (

        <>
            <div className={s.container}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{color: 'text.secondary'}}>
                            Security settings
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{width: '90%', flexShrink: 0}}>
                        <div onClick={onClickUpdatePassword}
                                    className={s.settingsElement}>
                            update password
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{color: 'text.secondary'}}>
                            Smart Random
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{width: '90%', flexShrink: 0}}>
                        <div onClick={onClickChangeRandomSettings}
                             className={s.settingsElement}>
                            change random settings
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{color: 'text.secondary'}}>
                            Other settings
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            New features will be here soon
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
}

export default compose<React.ComponentType>(withAuthRedirect)(SettingsMenu);

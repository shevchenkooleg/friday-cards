import React from 'react';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {Return} from "../Error404/Return";

const Profile = () => {
    return (
        <div>
            <div>Profile</div>
            Something should be here, but now
            <Return/>
        </div>
    );
};

export default compose<React.ComponentType>(withAuthRedirect)(Profile);
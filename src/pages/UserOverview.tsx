import * as React from 'react';
import {useLocation} from 'react-router-dom';
import {getUserColumns} from 'utils';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const UserOverview = () => {
    const {state} = useLocation();
    const userInfoColumns = getUserColumns(state);
    return (
        <Container>
            <Header title={`User ${state.firstName} ${state.lastName}`} />
            <Card columns={userInfoColumns} hasNavigation={false} navigationProps={state} />
        </Container>
    );
};

export default UserOverview;

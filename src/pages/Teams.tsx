import * as React from 'react';
import {Team} from 'types';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import {NormalizeTeamList} from 'utils';

const Teams = () => {
    const [teams, setTeams] = React.useState<Team[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={NormalizeTeamList(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;

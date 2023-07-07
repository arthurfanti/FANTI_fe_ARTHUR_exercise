import * as React from 'react';
import {TeamData} from 'types';
import {normalizeTeamList} from 'utils';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const Teams = () => {
    const [teams, setTeams] = React.useState<TeamData[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

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
            <List items={normalizeTeamList(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;

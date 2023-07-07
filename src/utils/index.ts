import {ListItem, ListItemColumn, TeamData, UserData} from 'types';

export const getUserColumns = (user: UserData): ListItemColumn[] => {
    return [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
};

export const getTeamLeaderColumns = (teamLeader: UserData): ListItemColumn[] => {
    if (!teamLeader) {
        return [];
    }

    return [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLeader.firstName} ${teamLeader.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLeader.displayName,
        },
        {
            key: 'Location',
            value: teamLeader.location,
        },
    ];
};

export const normalizeTeamList = (teams: TeamData[]): ListItem[] => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        };
    });
};

export const normalizeUserList = (users: UserData[]): ListItem[] => {
    return users.map(user => {
        const columns = getUserColumns(user);

        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    });
};

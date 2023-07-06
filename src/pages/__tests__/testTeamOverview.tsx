import * as React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => jest.fn(),
    useParams: () => ({
        teamId: '1',
    }),
}));
const teamOverview = {
    id: '1',
    teamLeadId: '2',
    teamMemberIds: ['3', '4', '5'],
};
const userData = {
    id: '2',
    firstName: 'userData',
    lastName: 'userData',
    displayName: 'userData',
    location: '',
    avatar: '',
};

const setup = () => {
    const utils = render(<TeamOverview />);
    return {
        ...utils,
    };
};

describe('TeamOverview', () => {
    beforeEach(() => {
        jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
        jest.spyOn(API, 'getUserData').mockImplementation(
            userId =>
                Promise.resolve({...userData, id: userId, displayName: `userData ${userId}`} as any) // append userId to displayName to enable filter test
        );
    });
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const {getAllByTestId} = setup();

        await waitFor(() => {
            expect(getAllByTestId(/cardContainer/)).toHaveLength(4);
        });
    });

    it('should filter by input', async () => {
        const {getAllByTestId, getByLabelText} = setup();
        let input = null;
        await waitFor(() => {
            input = getByLabelText('search') as HTMLInputElement;
            fireEvent.change(input, {target: {value: '3'}});
            fireEvent.submit(input);
        });

        await waitFor(() => {
            expect(getAllByTestId(/cardContainer/)).toHaveLength(2);
        });
    });
});

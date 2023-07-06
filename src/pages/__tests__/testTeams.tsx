import * as React from 'react';
import {render, screen} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

const setup = () => {
    const utils = render(<Teams />);
    const spinner = screen.getByTestId(/spinner/);
    return {
        spinner,
        ...utils,
    };
};

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        const {spinner} = setup();
        expect(spinner).toBeInTheDocument();
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        const {findByText} = setup();

        expect(await findByText('Team1')).toBeInTheDocument();
        expect(await findByText('Team2')).toBeInTheDocument();
    });
});

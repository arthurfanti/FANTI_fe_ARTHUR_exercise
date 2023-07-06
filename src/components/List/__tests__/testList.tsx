import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {ListItem} from 'types';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

const setup = (jsx: JSX.Element) => {
    const utils = render(jsx);
    return {
        ...utils,
    };
};

describe('List', () => {
    it('should render spinner and not render items when it is loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ] as ListItem[];

        const {getByTestId, queryByTestId} = setup(<List isLoading items={items} />);

        expect(getByTestId('spinner')).toBeInTheDocument();
        expect(queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ] as ListItem[];

        const {getByTestId, queryByTestId} = setup(<List isLoading={false} items={items} />);

        expect(queryByTestId('spinner')).not.toBeInTheDocument();
        expect(getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ] as ListItem[];

        const {getByTestId} = setup(<List isLoading={false} items={items} />);

        expect(getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(getByTestId('cardContainer-2')).toBeInTheDocument();
    });

    it('should filter cards based on search input', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ] as ListItem[];

        const {getAllByTestId, getByTestId, getByLabelText} = setup(
            <List isLoading={false} items={items} />
        );

        expect(getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(getByTestId('cardContainer-2')).toBeInTheDocument();

        const input = getByLabelText('search') as HTMLInputElement;
        fireEvent.change(input, {target: {value: 'Value1'}});
        fireEvent.submit(input);

        expect(getAllByTestId(/cardContainer/)).toHaveLength(1);
    });
});

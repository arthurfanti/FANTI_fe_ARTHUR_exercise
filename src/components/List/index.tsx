import * as React from 'react';
import {ListItem} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container, SearchForm} from './styles';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}
const List = ({items, hasNavigation = true, isLoading}: Props) => {
    const inputRef = React.useRef(null);
    const [filteredItems, setFilteredItems] = React.useState<ListItem[]>(items);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const regex = new RegExp(`${inputRef?.current?.value}`, 'gi');
        const newFilteredItems = items.filter(({columns}) =>
            columns.some(({value}) => value.match(regex))
        );
        setFilteredItems(newFilteredItems);
    };

    React.useEffect(() => {
        if (items) {
            setFilteredItems(items);
        }
    }, [items]);

    return isLoading ? (
        <Container>
            <Spinner />
        </Container>
    ) : (
        <Container>
            <SearchForm onSubmit={handleSubmit}>
                <input
                    aria-label="search"
                    placeholder="type what you want to find and hit [Enter]"
                    type="search"
                    ref={inputRef}
                />
            </SearchForm>
            <Container>
                {filteredItems.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                        />
                    );
                })}
            </Container>
        </Container>
    );
};

export default List;

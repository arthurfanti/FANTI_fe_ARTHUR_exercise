import styled from 'styled-components';

export const ListContainer = styled.div`
    flex: 1;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    min-width: 90vw;
`;

export const SearchForm = styled.form`
    display: flex;
    flex: 1 0 100%;
    margin: 20px;
    > input {
        width: calc(100% - 40px);
        display: flex;
        box-sizing: border-box;
        padding: 1rem;
    }
`;

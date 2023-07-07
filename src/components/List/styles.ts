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
        border: 1px solid lightgray;
        border-radius: 12px;
        font-weight: 700;
        transition: box-shadow 0.2s ease-out;
        &:focus {
            box-shadow: 0 0 0 2px darkblue;
            border-color: transparent;
        }
    }
`;

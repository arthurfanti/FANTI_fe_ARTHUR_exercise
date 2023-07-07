import styled from 'styled-components';

export const CardContainer = styled.button<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: none;
    background: transparent;
    padding: 2rem;
    margin: 0.5rem 0;
    box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.12),
        0 2px 4px rgba(0, 0, 0, 0.2);
    width: 300px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    transition: transform 0.2s ease-out, background 0.2s ease-out;
    &:hover {
        transform: scale(1.05);
        background: whitesmoke;
    }
`;

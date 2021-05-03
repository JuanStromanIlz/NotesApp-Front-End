import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 15px;
  color: ${props => props.withText && props.theme.colors.dark};
  background: ${props => props.withText ? props.theme.colors.disable : "transparent"};
  padding: ${props => props.withText ? '.5rem .8rem' : '0'};
  width: ${props => props.withText ? 'fit-content' : 'auto'};
  span  {
    color: ${props => props.theme.colors.disable};
    display: inline-block;
    vertical-align: middle;
  }
  &:hover, &:focus {   
    outline: none;
    cursor: pointer;  
    background: ${props => props.withText ? props.theme.colors.selected : "transparent"};
    color: ${props => props.theme.colors.white};
    span {
      outline: none;
      color: ${props => props.theme.colors.selected};
    }
  }
`;
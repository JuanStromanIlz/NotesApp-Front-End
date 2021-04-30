import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 15px;
  color: ${props => props.theme.colors.black};
  background: ${props => props.withText ? props.theme.colors.light : "transparent"};
  padding: ${props => props.withText ? '.5rem .8rem' : '0'};
  width: ${props => props.withText ? 'fit-content' : 'auto'};
  :hover {   
    background: ${props => props.withText ? props.theme.colors.dark : "transparent"};
  }
  :focus {
    background: ${props => props.withText ? props.theme.colors.dark : "transparent"};
  }
  span  {
    color: ${props => props.theme.colors.light};
    display: inline-block;
    vertical-align: middle;
  }
`;
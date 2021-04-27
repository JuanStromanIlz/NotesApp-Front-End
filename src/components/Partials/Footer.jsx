import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: .8rem;
  text-align: center;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <p>Pagina realizada utilizando React y styled-components.</p>
      <p>2021 Juan Stroman Ilz&emsp;&copy;</p>
    </StyledFooter>
  );
}
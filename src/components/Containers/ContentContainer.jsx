import styled from 'styled-components';

const Container = (props) => (
  <div className={props.className}>
    {props.children}
  </div>
);

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  > * {
    padding: 0 .8rem;
  }
`;

export default function ContentContainer(props) {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  );
}


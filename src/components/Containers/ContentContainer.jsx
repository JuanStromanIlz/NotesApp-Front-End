import styled from 'styled-components';

const Container = (props) => (
  <div className={props.className}>
    {props.children}
  </div>
);

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: .8rem;
  padding: .8rem;
`;

export default function ContentContainer(props) {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  );
}


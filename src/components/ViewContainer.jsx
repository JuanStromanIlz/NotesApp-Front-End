import styled from 'styled-components';

const Container = (props) => (
  <div id={props.id} className={props.className}>
    {props.children}
  </div>
);

const StyledContainer = styled(Container)`
  min-height: 100vh;
  margin: 0; 
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default function ViewContainer(props) {
  return (
    <StyledContainer 
      id={props.id}
    >
      {props.children}
    </StyledContainer>
  );
}
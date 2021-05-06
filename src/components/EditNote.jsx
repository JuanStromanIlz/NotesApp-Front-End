import styled from 'styled-components';
import { ValidationForm } from './Partials/ValidateForm';

const StyledEdit = styled.div`
  grid-column: 1 / 13;
  padding: .8rem;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 -1px ${props => props.theme.colors.light} inset;
  border-radius: 10px;
  @media (min-width: 50rem) and (min-height: 32rem) {
    grid-column: 4 / 10;
  }
`;

export const EditNote = ({noteEdit, submitEdit}) => (
  <StyledEdit>
    <ValidationForm 
      note={noteEdit}
      sendForm={submitEdit}
    />
  </StyledEdit>
);

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const Card = styled.div `
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    #profile-img {
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      height: 75px;
      width: 75px;
    }
    ${Button} {
      height: fit-content;
    }
  }
  .userInfo {
    margin: 0;
  }
  #user-notes {
    margin: .8rem 0;
  }
`;

export const ProfileCard = ({user}) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(user)
  }, [user]);

  return (
    <Card>
      <header>
        <img id='profile-img' src={profile.photo} alt={profile.fName}/>
        <Button>
          <span className='material-icons'>logout</span>
        </Button>
      </header>
      <h3 className='userInfo'>{profile.fName}</h3>
      <h4 className='userInfo'>{profile.email}</h4>
      <h4 id='user-notes'>{profile.notes} {profile.notes < 2 ? 'Nota' : 'Notas'}</h4>
    </Card>
  );
} 
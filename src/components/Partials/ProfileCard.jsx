import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const profile = {
  "_id": "607c409b01ef9b10e05f97bc",
  "fName": "Juan",
  "lName": "Stroman",
  "userPhoto": {
    "data": {
      "height": 200,
      "is_silhouette": false,
      "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2804743983097085&height=200&width=200&ext=1621347736&hash=AeQ5kJv1PP3sBWRidI0",
      "width": 200
    }
  },
  "email": "juanstroman@gmail.com",
  "facebookId": "2804743983097085",
  "__v": 0
};

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

export const ProfileCard = (props) => {
  const [notes, setNotes] = useState(3);
  useEffect(() => {
    setNotes(props.noteLenght)
  }, [props]);

  return (
    <Card>
      <header>
        <img id='profile-img' src={profile.userPhoto.data.url} alt={profile.fName}/>
        <Button>
          <span className='material-icons'>logout</span>
        </Button>
      </header>
      <h3 className='userInfo'>{profile.fName}</h3>
      <h4 className='userInfo'>{profile.email}</h4>
      <h4 id='user-notes'>{notes} Notas</h4>
    </Card>
  );
} 
import { useParams } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import UserReviews from '../components/UserReviews';

function UserDetails() {
  const { id } = useParams(); 

  return (
    <div>
      <UserDetail UserId={id} />
      <UserReviews UserId={id} />
    </div>
  );
}

export default UserDetails;
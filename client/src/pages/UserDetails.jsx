import { useParams } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import UserReviews from '../components/UserReviews';

function UserDetails( auth ) {
  const { id } = useParams(); 

  return (
    <div>
      <UserDetail UserId={id} />
      <UserReviews UserId={id} auth={auth.auth} />
    </div>
  );
}

export default UserDetails;
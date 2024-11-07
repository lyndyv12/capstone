import UserReviews from "../components/UserReviews";
import UserDetail from "../components/UserDetail";



const Account = ({ auth }) => {
  return (
    <div>
      Hi {auth.username}!
      <UserDetail user={ auth } />
      <UserReviews auth={ auth } UserId={ auth.id } />
    </div>
  );
};

export default Account;
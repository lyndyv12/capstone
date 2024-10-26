import UserReviews from "../components/UserReviews";

const Account = ({ auth }) => {
  return (
    <div>
      {auth.username}
      <UserReviews UserId= {auth.id}/>
    </div>
  );
};

export default Account;
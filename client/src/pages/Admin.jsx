import BusinessForm from "../components/BusinessForm";
import UserCard from "../components/UserCard";
import BusinessesContainer from "../components/BusinessesContainer";


const Admin = ({ auth, users, businesses }) => {
  return (
    <div>
      Hi {auth.username}!

      <h2>Add a business</h2>
      <BusinessForm />
      <h2>Businesses</h2>
      <BusinessesContainer businesses={businesses} auth={auth}/>

      <h2>Users</h2>
      {users.map((user)=>(
            <UserCard key={user.id} user={user} auth={auth} />
        ))}
    

    </div>
  );
};

export default Admin;
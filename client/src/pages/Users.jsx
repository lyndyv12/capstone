import UsersContainer from "../components/UsersContainer";

const Users = ({ users })=> {
  return (
    <div>
      <h1>Placeholder for Users { users.length }</h1>
      <div>
        <UsersContainer users={users}/>
      </div>
    </div>
  );
}


export default Users;

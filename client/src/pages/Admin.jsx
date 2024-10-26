import BusinessForm from "../components/BusinessForm";


const Admin = ({ auth }) => {
  return (
    <div>
      Hi {auth.username}!

      <h2>Add a business</h2>
      <BusinessForm />

    </div>
  );
};

export default Admin;
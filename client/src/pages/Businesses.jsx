import BusinessForm from "../components/BusinessForm";

const Businesses = ({ auth, businesses, businessFormAction })=> {
  return (
    <div>
    <h1>Placeholder for Businesses { businesses.length }</h1>
    <p>
      Display some interesting information about our {businesses.length}{" "}
      Businesses
    </p>
    {auth.id ? (
      <>
        <BusinessForm businessFormAction={businessFormAction} mode="create" />
      </>
    ) : null}
  </div>
  );
}


export default Businesses;

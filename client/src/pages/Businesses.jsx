import BusinessForm from "../components/BusinessForm";
import BusinessesContainer from "../components/BusinessesContainer";

const Businesses = ({ auth, businesses, businessFormAction })=> {
  return (
    <div>
      <h1>Placeholder for Businesses { businesses.length }</h1>
      <p>Display some interesting information about our {businesses.length}{" "}
      Businesses</p>
      <div>
        <BusinessesContainer businesses={businesses}/>
      </div>
      <div>{auth.id ? (
        <>
          <BusinessForm businessFormAction={businessFormAction} mode="create" />
        </>
      ) : null}
      </div>
    </div>
  );
}


export default Businesses;

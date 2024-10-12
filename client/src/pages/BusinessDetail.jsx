import BusinessCard from "../components/BusinessCard";
import BusinessDetailCard from "../components/BusinessDetailCard";
import BusinessReviews from "../components/BusinessReviews";


const BusinessDetail = ({ business })=> {
  return (
    <div>
        <BusinessDetailCard business={ business } />
        <BusinessReviews />
    </div>
  );
}


export default BusinessDetail;
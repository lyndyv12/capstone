import AuthForm from "../components/AuthForm/AuthForm";
import ReviewForm from "../components/ReviewForm";
import { useParams } from "react-router-dom";


const CreateReview = ({ auth, authAction, reviewFormAction, setRefreshReviews, businesses })=> {

  const { businessId } = useParams();

  return (
    <div>
    {auth.id ? (
      <>
        <ReviewForm 
          reviewFormAction={reviewFormAction} 
          authId= {auth.id}
          setRefreshReviews={setRefreshReviews} 
          businessId={businessId}
          businesses={businesses} mode="create" />
      </>
    ) : <div>
      You must first login to create a review 
      <AuthForm authAction={authAction} mode="login"/>
      </div>
    }
  </div>
  );
}


export default CreateReview;

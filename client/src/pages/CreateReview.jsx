import AuthForm from "../components/AuthForm/AuthForm";
import ReviewForm from "../components/ReviewForm";

const CreateReview = ({ auth, authAction, reviewFormAction, businesses })=> {
  return (
    <div>
    {auth.id ? (
      <>
        <ReviewForm reviewFormAction={reviewFormAction} authId= {auth.id} businesses={businesses} mode="create" />
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

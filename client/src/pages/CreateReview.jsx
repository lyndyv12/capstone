import ReviewForm from "../components/ReviewForm";

const CreateReview = ({ auth, reviewFormAction, businesses })=> {
  return (
    <div>
    <h1>Placeholder for Create Review</h1>
    <p>
      Display some interesting information about creating reviews.
    </p>
    {auth.id ? (
      <>
        <ReviewForm reviewFormAction={reviewFormAction} businesses={businesses} mode="create" />
      </>
    ) : null}
  </div>
  );
}


export default CreateReview;

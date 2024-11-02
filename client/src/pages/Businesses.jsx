import BusinessForm from "../components/BusinessForm";
import BusinessesContainer from "../components/BusinessesContainer";
import { useState } from "react";
import Modal from "../components/Modal";

const Businesses = ({ auth, businesses, businessFormAction }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h1>Businesses ({businesses.length})</h1>
      <p>Display some interesting information about our {businesses.length} businesses.</p>
      <div>
        <BusinessesContainer businesses={businesses} auth={auth} />
      </div>
      <button onClick={handleOpenModal}>Add New Business</button>

      <Modal show={showModal} onClose={handleCloseModal}>
        <BusinessForm 
          authId={auth?.id} 
          businessFormAction={businessFormAction} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
}

export default Businesses;


import BusinessForm from "../components/BusinessForm";
import BusinessesContainer from "../components/BusinessesContainer";
import { useState } from "react";
import Modal from "../components/Modal";

const Businesses = ({ auth, businesses, businessFormAction })=> {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  return (
    <div>
      <h1>Placeholder for Businesses { businesses.length }</h1>
      <p>Display some interesting information about our {businesses.length}{" "}
      Businesses</p>
      <div>
        <BusinessesContainer businesses={businesses}/>
      </div>
    </div>
  );
}


export default Businesses;

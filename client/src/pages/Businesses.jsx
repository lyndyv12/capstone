import React, { useState } from "react";
import BusinessForm from "../components/BusinessForm";
import BusinessesContainer from "../components/BusinessesContainer";
import Modal from "../components/Modal";
import { Container, Typography, Button } from "@mui/material";

const Businesses = ({ auth, businesses, businessFormAction }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Businesses ({businesses.length})
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Display some interesting information about our {businesses.length} businesses.
      </Typography>
      <BusinessesContainer businesses={businesses} auth={auth} />

      <Modal show={showModal} onClose={handleCloseModal}>
        <BusinessForm 
          authId={auth?.id} 
          businessFormAction={businessFormAction} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </Container>
  );
}

export default Businesses;



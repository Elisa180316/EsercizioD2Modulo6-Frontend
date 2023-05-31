import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddPostForm from "../forms/AddPostForm";


const AddPostModal = ({ handleAddNewPost, newPostIsLoading }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);//funzione per la chiusura del modale aggiornando lo stato  su false.//
  const handleShow = () => setShow(true);// funzione per la visualizzazione del modale aggiornando lo stato dello  su true
  const handleSubmit = (postData) => {
    handleAddNewPost(postData) //funzione richiamata quando viene inviato il Form. Riceve il postData come parametro e chiama la funzione handleAddNewPost, passando il postData. 
    
  };
  
    
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPostForm close={handleClose} handleSubmit={handleSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPostModal;


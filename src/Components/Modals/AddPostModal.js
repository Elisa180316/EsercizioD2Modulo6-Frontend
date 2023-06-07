import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddPostForm from "../forms/AddPostForm";
import '../../styles/addPostModal.css'



const AddPostModal = ({ handleAddNewPost, postsPerPage }) => {
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
          <Modal.Title>Submit a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPostForm close={handleClose} handleSubmit={handleSubmit} postsPerPage={postsPerPage} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPostModal;


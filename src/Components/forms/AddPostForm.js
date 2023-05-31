import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Toast } from "..//..//utilities/notifications";
import {getPosts} from '..//../Reducers/postsSlice'
import { addNewPost } from "../../Reducers/addNewPostSlice";


const AddPostForm = ({ close }) => {
  const toast = new Toast("Post salvato con successo");
  const noFile = new Toast(
    "File mancante, per favore selezionare almeno un file"
  );
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const onChangeHandlerFile = (e) => {//funzione chiamata quando viene selezionato un file. Imposta il file selezionato utilizzando l'hook di stato setFile
    setFile(e.target.files[0]); //Upload singolo file nell'indice 0
  };
  //Upload file,prende i dati del form,appendo file che ho passato parametro, con post invio il file
  const uploadFile = async (file) => {// caricamento del file sul server utilizzando l'API fetch. Crea un oggetto FormData e vi aggiunge il file ed effettua una richiesta POST al server utilizzando l'endpoint /posts/uploadImg.
    const fileData = new FormData();
    fileData.append("img", file);
    try {
      const response = await fetch("http://localhost:5050/posts/uploadImg", {
        method: "POST",
        body: fileData,
      });
      //Cattura str img//
      return await response.json();
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const submitPost = async (e) => { // funzione  richiamata quando il modulo viene inviato. Controlla se un file è selezionato, quindi chiama la funzione uploadFile per caricarlo poi crea postFormData combinando i dati del modulo e l'URL dell'immagine caricata. Invia l'azione addNewPost con postFormData e gestisce l'esito positivo mostrando un toast
    e.preventDefault();

    if (file) {
      try {
        //invio file
        const uploadedFile = await uploadFile(file);
        //promise risolta//
        const postFormData = {
          ...formData,
          //Str dell'img
          img: uploadedFile.img,
          
        };
       
        console.log(uploadedFile)
        console.log(file)
        dispatch(addNewPost(postFormData)).then(() => {
          toast.success();
          dispatch(
            //per dare i posts aggiornati senza refresh//
            getPosts({
              page: 1,
              pageSize: 8,
            })
          );
          
          close();
        });
      } catch (error) {
        console.error("Failed to save the post", error);
      }
    } else {
      console.error("Please select at least one file");
      noFile.missedFile();
    }
  };

  return (
    <div className="p-4">
      {/* Accetta sia file in upload che normali */}
      <form onSubmit={submitPost} encType="multipart/form-data">
        <div className="d-flex justify-content-center items-align-center gap-2">
          <input
            type="text"
            name="title"
            placeholder="titolo"
            className="p-2 text-dark mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="author"
            placeholder="autore"
            className="p-2 text-dark mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                author: e.target.value,
              })
            }
          />
          <select
            name="rate"
            placeholder="voto"
            className="p-2 text-dark mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                rate: Number(e.target.value),
              })
            }
          >
            <option>Dai un voto</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="Testo del post...."
            className="p-2 text-dark mb-2"
            rows={8}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
          />
        </div>
        <div>
          <input
            name="img"
            type="file"
            className="p-2 text-dark mb-2"
            onChange={onChangeHandlerFile}
          />
        </div>
        <div className="mt-8">
          <button type="submit" className="bg-primary">
            Salva
          </button>
          <button onClick={() => close()} className="bg-primary">
            Chiudi
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;

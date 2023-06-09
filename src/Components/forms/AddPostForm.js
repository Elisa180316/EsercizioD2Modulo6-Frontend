import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { Toast } from "../../utilities/notifications";
import { getPosts } from "../../Reducers/postsSlice";
import { addNewPost } from "../../Reducers/addNewPostSlice";
import useDecodedSession from "../../hook/useDecodedSession";
import { Toaster } from "react-hot-toast";

const AddPostForm = ({ close, postsPerPage }) => {
  const successToast = new Toast("Post salvato con successo");
  const errorToast = new Toast(
    "File mancante, per favore selezionare almeno un file"
  );

  const actualUser = useDecodedSession();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState(null)
  console.log(users)
  const dispatch = useDispatch();

  const getAllusers = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`)
      const response = await data.json()
      setUsers(response)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeHandlerFile = (e) => {
    //funzione chiamata quando viene selezionato un file. Imposta il file selezionato utilizzando l'hook di stato setFile
    setFile(e.target.files[0]); //Upload singolo file nell'indice 0
  };
  //Upload file,prende i dati del form,appendo file che ho passato parametro, con post invio il file
  const uploadFile = async (file) => {
    // caricamento del file sul server utilizzando l'API fetch. Crea un oggetto FormData e vi aggiunge il file ed effettua una richiesta POST al server utilizzando l'endpoint /posts/uploadImg.
    const fileData = new FormData();
    fileData.append("img", file);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts/uploadImg`, {
        method: "POST",
        body: fileData,
      });
      //Cattura str img//
      return await response.json();
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const submitPost = async (e) => {
    // funzione  richiamata quando il modulo viene inviato. Controlla se un file è selezionato, quindi chiama la funzione uploadFile per caricarlo poi crea postFormData combinando i dati del modulo e l'URL dell'immagine caricata. Invia l'azione addNewPost con postFormData e gestisce l'esito positivo mostrando un toast
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

        dispatch(addNewPost(postFormData)).then(() => {
          successToast.success()
          dispatch(
            //per dare i posts aggiornati senza refresh//
            getPosts({
              page: 1,
              pageSize: postsPerPage,
            })
          );
        });
      } catch (error) {
        console.error("Failed to save the post", error);
      }
    } else {
      console.error("Please select at least one file");
      errorToast.error();
    }
  };

  useEffect(() => {
    getAllusers()
  }, [])

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="p-4">
        {/* Accetta sia file in upload che normali */}
        <form onSubmit={submitPost} encType="multipart/form-data">
          <div className="d-flex justify-content-center items-align-center gap-2">
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              className="p-2 text-dark mb-2"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
            <select
              name="rate"
              placeholder="Give a rate"
              className="p-2 text-dark mb-2"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rate: Number(e.target.value),
                })
              }
            >
              <option>Give a rate</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          {/* Admin loggato */}
          <div>
            {actualUser && actualUser?.role === "user" ? (
              <select
                name="author"
                placeholder="author"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    author: e.target.value,
                  })
                }
              >
                <option>Scegli autore</option>
                <option value={actualUser?.id}>{actualUser?.firstname}</option>
              </select>
            ): (
                <select
                    name="author"
                    placeholder="author"
                    onChange={(e) =>
                        setFormData({
                          ...formData,
                          author: e.target.value,
                        })
                    }
                >
                  <option>Scegli autore</option>
                  {users && users.users.map((option) => {
                    return (
                        <option key={option._id} value={option._id}>{option.firstname} {option.lastname}</option>
                    )
                  })}
                </select>
            )}

          </div>
          <div>
            <textarea
              placeholder="Write here your post"
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
            <button
              onClick={() => close()}
              type="submit"
              className="bg-primary"
            >
              Salva
            </button>
            <button className="bg-primary">Chiudi</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPostForm;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; 
//Hook che gestisce la sessione login-Home//
const useSession = () => {
  //Parse del local Storage//
  const session = JSON.parse(localStorage.getItem("auth")); 
  const decodedSession = jwt_decode(session); 
  console.log(decodedSession);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  }, [navigate, session]);

  return decodedSession;
};

export default useSession;

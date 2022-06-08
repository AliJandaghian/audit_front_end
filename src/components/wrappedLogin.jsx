import { useNavigate, useLocation } from "react-router-dom";
import Login from "./login";

const WrappedLoggin = (props) => {
  const location = useLocation();
  const navigate = useNavigate();


  return <Login navigate={navigate} location={location} {...props} />;
};

export default WrappedLoggin;

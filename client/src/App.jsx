import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import "./App.css";
import axios from "axios";
import reacSvg from "./assets/react.svg";
function App() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  axios.defaults.withCredentials = false;
  async function LogoutHandler(e) {
    try {
      e.preventDefault();
      await axios.post("/logout");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <img src={reacSvg} alt="" onClick={LogoutHandler} />
      {/* <Register />
      <Login /> */}
      <ForgotPass />
    </>
  );
}

export default App;

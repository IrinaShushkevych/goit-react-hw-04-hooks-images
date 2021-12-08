import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Main />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;

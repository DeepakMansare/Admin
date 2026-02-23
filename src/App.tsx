import { SnackbarProvider } from "miraiedge-ui-lib";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AppRoutes />
      <SnackbarProvider />
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default App;

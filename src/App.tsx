import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./rtk/store";
import Index from "./routes";
import Loader from "./components/loader";
import Alert from "./components/alert";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Loader />
        <Alert />
        <Index />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

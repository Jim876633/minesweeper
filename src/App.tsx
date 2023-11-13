import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routerConfig from "./router/routerConfig";
import { Provider } from "react-redux";
import { store } from "./store";
import Modal from "./utils/components/Modal";

function App() {
  const router = createBrowserRouter(routerConfig, {
    basename: import.meta.env.BASE_URL,
  });
  return (
    <Provider store={store}>
      <Modal />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

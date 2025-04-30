import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import { Provider } from "react-redux";
import { persistor, store } from "@store/index";
import AppRouter from "@routes/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

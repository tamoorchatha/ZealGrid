import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import Signin from "./pages/Signin.jsx";
import GetStarted from "./pages/GetStarted.jsx";
// import { AuthLayout } from "./components/index.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/getStarted" element={<GetStarted />} />
    </>
    
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

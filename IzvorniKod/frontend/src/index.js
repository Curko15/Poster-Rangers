import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AddPosterComponent from "./components/AddPosterComponent";
import AddConferenceComponent from "./components/addConferenceComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AddPosterComponent/>
      <AddConferenceComponent/>
  </React.StrictMode>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyledEngineProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

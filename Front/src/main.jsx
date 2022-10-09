import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { StateProvider } from "./store/StateContext";
import App from "./App";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <StateProvider>
        <App />
      </StateProvider>
    </ChakraProvider>
  </React.StrictMode>
);

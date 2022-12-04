import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import EthProvider from "./providers";

ReactDOM.render(
  <React.StrictMode>
    <EthProvider>
      <App />
    </EthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

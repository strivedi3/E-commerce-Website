import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import { HashRouter as Router } from 'react-router-dom';
import store from "./store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
      </Router>
    </Provider>
  </StrictMode>
);

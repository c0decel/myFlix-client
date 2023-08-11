import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const App = () => {
  return (
    <Container className="container">
      <MainView />
    </Container>
  );
};



const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);

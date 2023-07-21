import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { MovieView } from "./components/movie-view/movie-view";
import { MovieCard } from "./components/movie-card/movie-card";
import "./index.scss";

// main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      {/* Render the MainView component */}
      <MainView />
    </div>
  );
};

// find root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// tell react to render your app in the root DOM element
root.render(<MyFlixApplication />);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Indexeasy1 from "./pages/Map1/indexeasy1.jsx";
import Indexeasy2 from "./pages/Map2/indexeasy2.jsx";
import Indexeasy3 from "./pages/Map3/indexeasy3.jsx";


import Indexhard1 from "./pages/Map1/indexhard1.jsx";
import Indexhard2 from "./pages/Map2/indexhard2.jsx";
import Indexhard3 from "./pages/Map3/indexhard3.jsx";


import Indexmedium1 from "./pages/Map1/indexmedium1.jsx";
import Indexmedium2 from "./pages/Map2/indexmedium2.jsx";
import Indexmedium3 from "./pages/Map3/indexmedium3.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "map1/easygame", element: <Indexeasy1 /> },
      { path: "map2/easygame", element: <Indexeasy2 /> },
      { path: "map3/easygame", element: <Indexeasy3 /> },

      { path: "map1/mediumgame", element: <Indexmedium1 /> },
      { path: "map2/mediumgame", element: <Indexmedium2 /> },
      { path: "map3/mediumgame", element: <Indexmedium3 /> },

      { path: "map1/hardgame", element: <Indexhard1 /> },
      { path: "map2/hardgame", element: <Indexhard2 /> },
      { path: "map3/hardgame", element: <Indexhard3 /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

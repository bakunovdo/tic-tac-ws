import "./index.css";

import { Route, RouterProvider } from "atomic-router-react";

import { router } from "./routing";

import { LobbyPage } from "../pages/lobby";
import { NotFound } from "../pages/not-found";

export function Application() {
  return (
    <div className="h-screen text-xl">
      <RouterProvider router={router}>
        <Route route={LobbyPage.route} view={LobbyPage.Page} />
        <Route route={NotFound.route} view={NotFound.Page} />
      </RouterProvider>
    </div>
  );
}

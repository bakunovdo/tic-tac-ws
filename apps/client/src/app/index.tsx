import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { Route, RouterProvider } from "atomic-router-react";

import { ToastContainer } from "react-toastify";

import { router } from "./model/routing";

import { LobbyPage } from "../pages/lobby";
import { NotFound } from "../pages/not-found";
import { useEffect } from "react";
import { appStarted } from "./model";
import { MatchPage } from "../pages/match";
import { DebugWindow } from "../widgets/debug-window";
import { MatchNotFound } from "../pages/match/not-found";

export function Application() {
  useEffect(appStarted, []);

  return (
    <>
      <DebugWindow />
      <div className="h-screen text-xl">
        <RouterProvider router={router}>
          <Route route={LobbyPage.route} view={LobbyPage.Page} />
          <Route route={NotFound.route} view={NotFound.Page} />
          <Route route={MatchPage.route} view={MatchPage.Page} />
          <Route route={MatchNotFound.route} view={MatchNotFound.Page} />
        </RouterProvider>
      </div>
      <ToastContainer />
    </>
  );
}

import { sample } from "effector";

import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";

import { LobbyPage } from "../../pages/lobby";
import { NotFound } from "../../pages/not-found";
import { MatchPage } from "../../pages/match";

export const routes = [
  { path: "/", route: LobbyPage.route },
  { path: "/:matchId", route: MatchPage.route },
  { path: "/404", route: NotFound.route },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({ routes, notFoundRoute: NotFound.route });

router.setHistory(history);

const log =
  (name?: string) =>
  (...args: unknown[]) =>
    console.log(name ? name : "", ...args);

router.$path.watch(log("path"));
router.$activeRoutes.watch(log("activeRoutes"));
router.routeNotFound.watch(log("routeNotFound"));

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: NotFound.route.open,
});

import { sample } from "effector";

import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";

import { LobbyPage } from "../../pages/lobby";
import { NotFound } from "../../pages/not-found";
import { MatchPage } from "../../pages/match";
import { MatchNotFound } from "../../pages/match/not-found";

export const routes = [
  { path: "/", route: LobbyPage.route },
  { path: "/match/:matchId", route: MatchPage.route },
  { path: "/404", route: NotFound.route },
  { path: "/match-not-found", route: MatchNotFound.route },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({ routes, notFoundRoute: NotFound.route });

router.setHistory(history);

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: NotFound.route.open,
});

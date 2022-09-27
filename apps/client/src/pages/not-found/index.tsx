import { Link } from "atomic-router-react";
import { createRoute } from "atomic-router";

import { LobbyPage } from "../lobby/index";

const route = createRoute();

const Page = () => {
  return (
    <div>
      <h1>This is not found page</h1>
      <br />
      <br />
      <Link to={LobbyPage.route}>Home Page</Link>
    </div>
  );
};

export const NotFound = {
  route,
  Page,
};

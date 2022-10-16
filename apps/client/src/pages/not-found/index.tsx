import { Link } from "atomic-router-react";
import { createRoute } from "atomic-router";

import { LobbyPage } from "../lobby/index";

const route = createRoute();

const Page = () => {
  return (
    <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
      <div className="mx-auto text-center">
        <h2 className="font-bold">Page not found</h2>
        <Link className="flex mt-4 btn btn-primary" to={LobbyPage.route}>
          Home Page
        </Link>
      </div>
    </div>
  );
};

export const NotFound = {
  route,
  Page,
};

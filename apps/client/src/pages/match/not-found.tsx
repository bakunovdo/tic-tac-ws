import { createRoute } from "atomic-router";
import { Link } from "atomic-router-react";
import { LobbyPage } from "../lobby";

const route = createRoute();

const Page: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
      <div className="mx-auto text-center">
        <h2 className="font-bold">Match not found</h2>
        <Link className="flex mt-4 btn btn-accent" to={LobbyPage.route}>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export const MatchNotFound = {
  route,
  Page,
};

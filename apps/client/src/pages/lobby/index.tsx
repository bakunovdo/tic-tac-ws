import { createRoute } from "atomic-router";
import { CodeLayout } from "./code-layout";

const route = createRoute();

const Page: React.FC = () => {
  return <CodeLayout code="abc" onSubmit={console.log} />;
};

export const LobbyPage = {
  route,
  Page,
};

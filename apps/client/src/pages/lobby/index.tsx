import { createRoute } from "atomic-router";
import { useEvent, useStore } from "effector-react";

import { lobbyModel } from "../../entities/game";

import { CodeLayout } from "./code-layout";

const route = createRoute();

const Page: React.FC = () => {
  const code = useStore(lobbyModel.$lobbyCode);
  const handleSubmit = useEvent(lobbyModel.formSubmitted);
  const handleRefresh = useEvent(lobbyModel.refreshCodePressed);

  return <CodeLayout code={code || "0000"} onSubmit={handleSubmit} onRefresh={handleRefresh} />;
};

export const LobbyPage = {
  route,
  Page,
};

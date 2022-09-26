import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import { Application } from "./app/application";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Application />
  </StrictMode>,
);

import { useStore } from "effector-react";
import clx from "classnames";
import { $debugState } from "../entities/game/debug";
import { useState } from "react";

export const DebugWindow = () => {
  const [isOpen, setIsOpen] = useState(true);

  const state = useStore($debugState);

  const toggle = () => setIsOpen((v) => !v);

  return (
    <section
      className={clx("absolute left-4 top-4 whitespace-pre-line text-sm border", {
        "max-h-96 max-w-xl w-full overflow-y-scroll ": isOpen,
      })}
    >
      <div className="flex items-center p-2  border-b-2 sticky top-0 bg-white">
        <h4 className="font-bold mr-4">Debug window</h4>
        <button className="btn btn-ghost btn-xs" onClick={toggle}>
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      <pre className={!isOpen ? "hidden" : "p-2"}>{JSON.stringify(state, null, 4)}</pre>
    </section>
  );
};

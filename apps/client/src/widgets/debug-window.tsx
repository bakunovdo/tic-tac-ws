import { useStore } from "effector-react";
import clx from "classnames";
import { $debugState } from "../entities/game/debug";
import { JsonViewer } from "@textea/json-viewer";
import { useState } from "react";

export const DebugWindow = () => {
  const [isOpen, setIsOpen] = useState(true);

  const state = useStore($debugState);

  const toggle = () => setIsOpen((v) => !v);

  return (
    <section
      className={clx(
        "absolute left-4 top-4 whitespace-pre-line text-sm max-w-md w-full max-h-96 overflow-hidden z-10 opacity-75",
        {
          "overflow-y-scroll bg-slate-100": isOpen,
          "max-h-10 max-w-fit": !isOpen,
        },
      )}
    >
      <div
        className={clx("flex items-center p-2  border-b-2 sticky top-0  z-10", {
          "bg-slate-50": isOpen,
        })}
      >
        <h4 className="font-bold mr-4">Debug window</h4>
        <button className="btn btn-ghost btn-xs" onClick={toggle}>
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      {state && (
        <JsonViewer
          value={state}
          rootName={false}
          quotesOnKeys={false}
          indentWidth={2}
          displayDataTypes={false}
          enableClipboard={false}
        />
      )}
    </section>
  );
};

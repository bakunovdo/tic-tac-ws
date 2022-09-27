import { FormEvent, useState } from "react";

type Props = {
  code: string;
  onSubmit: (text: string) => void;
};

export const CodeLayout: React.FC<Props> = (props) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (props.code) {
      window.navigator.clipboard.writeText(props.code);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  const handleRefresh = () => {
    console.log("Hello");
  };

  return (
    <div className="container h-full max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col w-full  max-w-xs mx-auto">
        <div className="text-2xl font-bold text-center mb-4">
          <h2>Your code</h2>
        </div>
        <div className="flex w-full items-center px-4 py-2">
          <div className="font-bold text-4xl tracking-widest uppercase">{props.code}</div>
          <div className="ml-auto">
            <button
              data-tip="Copy to clipboard"
              className="btn btn-outline btn-sm mx-1 tooltip"
              onClick={handleClick}
            >
              <span aria-label="copy" role="img">
                C
              </span>
            </button>
            <button
              data-tip="Refresh code"
              className="btn btn-outline btn-sm mx-1 tooltip"
              onClick={handleRefresh}
            >
              <span aria-label="refresh" role="img">
                ↻
              </span>
            </button>
          </div>
        </div>
        <hr className="my-2" />
        <form className="mt-4" onSubmit={handleSubmit}>
          <h4 className="font-bold text-xl mb-2">Enter to friend</h4>
          <div className="flex">
            <input
              className="input input-primary flex-1 text-center"
              type="text"
              placeholder="Type a code"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button className="btn btn-primary ml-2">Go</button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { createRoute } from "atomic-router";

import clx from "classnames";

const route = createRoute<{ matchId: string }>();

function chunk<T>(arr: T[], len: number) {
  const chunks = [];
  let i = 0;

  while (i < arr.length) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
}

const Page: React.FC = () => {
  const isMeTurn = true;
  const isEnemyTurn = !isMeTurn;
  const board = chunk([0, 1, -1, 0, 1, 0, 1, 0, -1], 3);

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
      <div className="mx-auto w-1/2 flex justify-center items-center font-bold">
        <div className="flex flex-col items-center ">
          <h1
            className={clx("text-blue-800", {
              underline: isMeTurn,
            })}
          >
            You
          </h1>
          <h3>0</h3>
        </div>

        <div className="mx-auto text-3xl text-slate-500">30</div>

        <div className="flex flex-col items-center">
          <h1
            className={clx("text-red-800", {
              underline: isEnemyTurn,
            })}
          >
            Enemy
          </h1>
          <h3>0</h3>
        </div>
      </div>
      <div className="mx-auto w-fit mt-12 mb-24">
        <div className="flex flex-col">
          {board.map((row) => {
            return (
              <div className="flex">
                {row.map((item) => {
                  const isEmpty = item === 1 || item === -1;
                  return (
                    <div
                      className={clx(
                        "flex w-24 h-24 border items-center justify-center hover:bg-slate-50",
                        {
                          " hover:cursor-pointer": !isEmpty,
                          " hover:cursor-not-allowed": isEmpty,
                        },
                      )}
                    >
                      {item === 1 && "X"}
                      {item === -1 && "0"}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const MatchPage = {
  route,
  Page,
};

import { CellIdx } from "@tic-tac-ws/types";
import { createRoute } from "atomic-router";

import clx from "classnames";
import { useEvent, useStore } from "effector-react";
import { matchModel } from "../../entities/game";

const route = createRoute<{ matchId: string }>();

const Page: React.FC = () => {
  const isConnecting = useStore(matchModel.$isConnecting);
  const onCellPressed = useEvent(matchModel.events.cellPressed);

  const isMeTurn = true;
  const isEnemyTurn = !isMeTurn;

  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  if (isConnecting) {
    return <>loading...</>;
  }

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
          {board.map((row, rowIdx) => {
            return (
              <div className="flex">
                {row.map((item, colIdx) => {
                  const isEmpty = item === 1 || item === -1;
                  return (
                    <div
                      onClick={() => onCellPressed([rowIdx, colIdx] as [CellIdx, CellIdx])}
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

import React from "react";
import { BoardProps } from "boardgame.io/react";
import { G } from "./types";

interface LocalBoardProps extends BoardProps {
  G: G
}

const Board = ({G, ctx, moves, isActive}: LocalBoardProps) => {
  const player = ctx.currentPlayer;
  const result = ctx.gameover;

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <div style={{ textAlign: "center" }}>
            { result ? (
              <p>{result.winner} wins!</p>
            ) : (
              <p>{player} turn</p>
            )}
            <p>Player 0 score: { G.scores.get("0") }</p>
            <p>Player 1 score: { G.scores.get("1") }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

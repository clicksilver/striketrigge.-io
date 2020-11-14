import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./types";

const MyBoard = ({G, ctx, moves, isActive}: BoardProps<GameState>) => {
  const player = ctx.currentPlayer;
  const result = ctx.gameover;
  const scores = G.scores;

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
            <p>Player 0 score: { scores ? (scores['0']) : '-' }</p>
            <p>Player 1 score: { scores ? (scores['1']) : '-' }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBoard;

import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./types";

interface LocalBoardProps extends BoardProps {
  G: GameState
}

const Board = ({G, ctx, moves, isActive}: LocalBoardProps) => {
  const player = ctx.currentPlayer;
  const result = ctx.gameover;
  // const scores = G.scores;

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
            {/*
            <p>Player 0 score: { scores ? (scores.get('0')) : '0' }</p>
            <p>Player 1 score: { scores ? (scores.get('1')) : '1' }</p>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

import React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import MyBoard from "./board";
import MyGame from "./game";

interface MultiplayerProps {
  serverURL: string;
  matchID: string;
  player?: string;
  credentials?: string;
}

const Multiplayer = ({
  serverURL,
  matchID,
  player,
  credentials,
}: MultiplayerProps) => {
  const url = `${window.location.origin}/join/${matchID}`;
  const MultiplayerClient = Client({
    game: MyGame,
    board: MyBoard, // Rendered inside the Multiplayer Component
    multiplayer: SocketIO({ server: serverURL }),
    numPlayers: 2,
    debug: true,
  });
  return (
    <div className="row flex-center">
      <div className="col no-padding">
        {/* Invite URLs to join as a player. */}
        <p>You are Player {player}</p>
        <p>Invite Player 0: {url}/0</p>
        <p>Invite Player 1: {url}/1</p>
        <br/>

        {/* Multiplayer component also loads the Board. */}
        <MultiplayerClient
          matchID={matchID}
          playerID={player}
          credentials={credentials}
          debug={true}
        />
      </div>
    </div>
  );
};

export default Multiplayer;

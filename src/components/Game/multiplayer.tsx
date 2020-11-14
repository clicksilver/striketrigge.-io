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
  const MultiplayerClient = Client({
    game: MyGame,
    board: MyBoard,
    multiplayer: SocketIO({ server: serverURL }),
    numPlayers: 2,
    debug: true,
  });
  return (
    <div className="row flex-center">
      <div className="col no-padding">
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

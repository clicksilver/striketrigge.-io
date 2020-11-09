import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { loadCredentials, saveCredentials } from "../../storage";
import { joinMatch } from "../../lobby";
import Multiplayer from "../Game/multiplayer";

interface JoinPageProps {
  serverURL: string;
}

interface Params {
  matchID: string;
  player: string;
}

const JoinPage = ({ serverURL }: JoinPageProps) => {
  const { matchID, player }: Params = useParams();
  const [credentials, setCredentials] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const creds = loadCredentials(matchID, player);
    if (creds) {
      setCredentials(creds);
    } else {
      joinMatch(serverURL, matchID, Number(player))
        .then((creds) => {
          saveCredentials(matchID, player, creds);
          setCredentials(creds);
        })
        .catch((err) => setError(err.toString()));
    }
  }, [serverURL, matchID, player]);

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          
          {/* If we have credentials, then proceed to create the multiplayer
              client (and associated game UI). */}
          {credentials && (
            <Multiplayer
              serverURL={serverURL}
              matchID={matchID}
              player={player}
              credentials={credentials}
            />
          )}
          
          {/* If there is an error with credentials, show an alert. */}
          {error && (
            <div className="alert alert-danger margin-top">{error}</div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default JoinPage;

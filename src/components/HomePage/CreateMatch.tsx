import React, { useState } from "react";
import { createMatch } from "../../lobby";

import { useHistory } from "react-router-dom";

interface CreateMatchProps {
  serverURL: string;
}

const CreateMatch = ({ serverURL }: CreateMatchProps) => {
  // After creating the match, we use history to join the newly created match
  // automatically.
  const history = useHistory();

  // Creator of the match is automatically set to first player.
  const [player, setPlayer] = useState("0");

  // Track if the button is clicked.
  const [clicked, setClicked] = useState(false);

  const [matchID, setMatchID] = useState("");
  const [error, setError] = useState("");

  const onClick = () => {
    setClicked(true);
    createMatch(serverURL)
      .then((id) => setMatchID(id))
      .catch((err) => setError(err.toString()));
  };

  return (
    <div>
      <div className="row flex-center">
        
        {/* If the button is clicked, then it is hidden. */}
        <div className="col flex-initial">
          <button disabled={clicked} onClick={onClick}>
            Create Match
          </button>
        </div>
        
        {/* Push history so that the back button works. */}
        {matchID && history.push(`/join/${matchID}/${player}`)}

      </div>

      {/* If an error occurred while trying to create the match, this component
          will be shown, which indicated an error. */}
      {error && (
        <div className="row flex-center">
          <div className="col no-padding">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreateMatch;

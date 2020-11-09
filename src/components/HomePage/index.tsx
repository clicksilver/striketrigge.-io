import React from "react";
import CreateMatch from "./CreateMatch";

interface HomePageProps {
  serverURL: string;
}

const HomePage = ({ serverURL }: HomePageProps) => (
  <div className="row flex-center">
    <div className="col no-padding">
      <div style={{ textAlign: "center" }}>
        <h1>Game Lobby Example</h1>
      </div>
      <CreateMatch serverURL={serverURL} />
    </div>
  </div>
);

export default HomePage;

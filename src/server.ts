import { Server } from "boardgame.io/server";
import MyGame from "./components/Game/game";

// This file isn't run by react-scripts, so we need to load variables manually.
require("dotenv").config();

const server = Server({ games: [MyGame] });
const port = parseInt(process.env.REACT_APP_PORT ?? "8000");
server.run(port);

/**
 * This module follows the API schema from: https://boardgame.io/documentation/#/api/Lobby
 */

import MyGame from "./components/Game/game";

/** Represents a match. */
export interface Match {
  matchID: string;
  players: Map<number, string | null>;
}

/** Defines headers for POST requests. */
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/** Create a match and return the match ID. */
export const createMatch = async (
  serverURL: string
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${MyGame.name}/create`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      numPlayers: 2,
      unlisted: false,
    }),
  });
  if (!resp.ok) {
    throw new Error("failed to create match: " + (await resp.text()));
  }
  const data = await resp.json();
  if (typeof data.matchID !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.matchID as string;
  }
};

/** Join a match and return the player credentials. */
export const joinMatch = async (
  serverURL: string,
  matchID: string,
  player: number
): Promise<string> => {
  const resp = await fetch(`${serverURL}/games/${MyGame.name}/${matchID}/join`, {
    method: "POST",
    headers,
    body: JSON.stringify({ playerID: player, playerName: player.toString() }),
  });
  if (!resp.ok) {
    throw new Error("failed to join match: " + (await resp.text()));
  }
  const data = await resp.json();
  if (typeof data.playerCredentials !== "string") {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.playerCredentials as string;
  }
};

/** Leave a match. */
export const leaveMatch = async (
  serverURL: string,
  matchID: string,
  player: number,
  credentials: string
): Promise<void> => {
  const resp = await fetch(`${serverURL}/games/${MyGame.name}/${matchID}/leave`, {
    method: "POST",
    headers,
    body: JSON.stringify({ playerID: player, credentials }),
  });
  if (!resp.ok) {
    throw new Error("failed to leave match: " + (await resp.text()));
  }
};

/** List the IDs of all public matches. */
export const listMatchIDs = async (
  serverURL: string
): Promise<Array<string>> => {
  const resp = await fetch(`${serverURL}/games/${MyGame.name}`);
  if (!resp.ok) {
    throw new Error("failed to list match IDs: " + (await resp.text()));
  }
  const data = await resp.json();
  if (
    !Array.isArray(data.matches) ||
    data.matches.some((m: any) => typeof m.matchID !== "string")
  ) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return data.matches.map((m: any) => m.matchID) as Array<string>;
  }
};

/** Get information about a match. */
export const getMatch = async (
  serverURL: string,
  matchID: string
): Promise<Match> => {
  const resp = await fetch(`${serverURL}/games/${MyGame.name}/${matchID}`);
  if (!resp.ok) {
    throw new Error("failed to get match: " + (await resp.text()));
  }
  const data = await resp.json();
  if (
    typeof data.matchID !== "string" ||
    !Array.isArray(data.players) ||
    data.players.some((p: any) => typeof p.id !== "number") ||
    data.players.some((p: any) => p.name && typeof p.name !== "string")
  ) {
    throw new Error("invalid response data: " + JSON.stringify(data));
  } else {
    return {
      matchID: data.matchID as string,
      players: new Map<number, string | null>(
        data.players.map((p: any) => [
          p.id,
          p.name ?? null,
        ])
      ),
    };
  }
};

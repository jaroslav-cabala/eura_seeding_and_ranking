import { rankedPlayers } from "@/src/testData_rankedPlayers";
import { getTotalPointsFromXBestResults } from "../lib/getTotalPointsFromXBestResults";

export type GetPlayersSortedByPointsResult = Array<{
  playerId: string;
  playerUid: string;
  name: string;
  points: number;
}>;

export const useGetPlayersSortedByPointsOfTwoBestResults = (): GetPlayersSortedByPointsResult => {
  return rankedPlayers.map<GetPlayersSortedByPointsResult[number]>((player) => ({
    playerId: player.id,
    playerUid: player.uid,
    name: player.name,
    points: getTotalPointsFromXBestResults(player.tournamentResults, 2),
  }));
};

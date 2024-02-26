import { playersOpen } from "@/src/testData";
import { getTotalPointsFromXBestResults } from "../lib/getTotalPointsFromXBestResults";

export type GetPlayersSortedByPointsResult = Array<{
  playerId: string;
  name: string;
  points: number;
}>;

export const useGetPlayersSortedByPointsOfTwoBestResults = (): GetPlayersSortedByPointsResult => {
  return playersOpen.map<GetPlayersSortedByPointsResult[number]>((player) => ({
    playerId: player.playerId,
    name: player.name,
    points: getTotalPointsFromXBestResults(player.results, 2),
  }));
};

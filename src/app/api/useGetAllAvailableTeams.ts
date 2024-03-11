import { rankedTeams } from "@/src/testData_rankedTeams";
import { getTotalPointsFromXBestResults } from "../lib/getTotalPointsFromXBestResults";
import { Player } from "./types";

export type GetAllAvailableTeamsResult = Array<{
  teamId: string;
  teamUid: string;
  name: string;
  player1: Player;
  player2: Player;
  points: number;
}>;

export const useGetAllAvailableTeams = (): GetAllAvailableTeamsResult => {
  return rankedTeams.map<GetAllAvailableTeamsResult[number]>((team) => ({
    teamId: team.id,
    teamUid: team.uid,
    name: team.name,
    player1: team.players[0],
    player2: team.players[1],
    points: getTotalPointsFromXBestResults(team.tournamentResults, 2)
  }));
};

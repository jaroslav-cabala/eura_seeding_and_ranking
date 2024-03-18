import { rankedTeams } from "@/src/testData_rankedTeams";
import { getTotalPointsFromXBestResults } from "../lib/getTotalPointsFromXBestResults";
import { Player } from "./types";

export type GetAllAvailableTeamsResult = Array<{
  teamId: string;
  teamUid: string;
  name: string;
  playerOne: Player;
  playerTwo: Player;
  points: number;
}>;

export const useGetAllAvailableTeams = (): GetAllAvailableTeamsResult => {
  return rankedTeams.map<GetAllAvailableTeamsResult[number]>((team) => ({
    teamId: team.id,
    teamUid: team.uid,
    name: team.name,
    playerOne: team.players[0],
    playerTwo: team.players[1],
    points: getTotalPointsFromXBestResults(team.tournamentResults, 2)
  }));
};

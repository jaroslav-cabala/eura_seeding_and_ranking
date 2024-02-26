import { teamsOpen } from "@/src/testData";

export type GetAllAvailableTeamsResult = Array<{
  teamId: string;
  name: string;
}>;

export const useGetAllAvailableTeams = (): GetAllAvailableTeamsResult => {
  return teamsOpen.map<GetAllAvailableTeamsResult[number]>((team) => ({
    teamId: team.id,
    name: team.name,
  }));
};

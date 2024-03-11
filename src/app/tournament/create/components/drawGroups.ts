import { TournamentDrawSettings, Group, TournamentDraw } from "./TournamentDraw";
import { ParticipatingTeam } from "./types";

export const drawGroups = (
  participatingTeams: ParticipatingTeam[],
  tournamentDrawSettings: TournamentDrawSettings
): TournamentDraw | undefined => {
  const numberOfGroups = Number(tournamentDrawSettings.groups);
  const groups: Array<Group> = Array(numberOfGroups).fill(0).map(() => ({ teams: [] }))
  let powerpools: Array<Group> | undefined = undefined;

  const _participatingTeams = [...participatingTeams];

  if (Number(tournamentDrawSettings.powerpoolGroups)) {
    const powerpoolTeams = _participatingTeams.splice(0, Number(tournamentDrawSettings.powerpoolTeams));
    powerpools = drawPowerpools(powerpoolTeams.reverse(), Number(tournamentDrawSettings.powerpoolGroups));
  }

  _participatingTeams.reverse();
  while (_participatingTeams.length) {
    for (const group of groups) {
      const team = _participatingTeams.pop();
      if (team) {
        group.teams.push(team);
      } else if (!team && _participatingTeams.length) {
        // if for some reason there's no team left to add to a group but there should,
        // group draw is invalid - return undefined
        return undefined;
      }
    }
  }

  return {
    groups,
    powerpools
  };
};

const drawPowerpools = (
  powerpoolTeams: Array<ParticipatingTeam>,
  noPowerpoolGroups: number
): TournamentDraw["powerpools"] => {
  const powerpoolGroups: Array<Group> = Array(noPowerpoolGroups).fill(0).map(() => ({ teams: [] }))

  while (powerpoolTeams.length) {
    for (const group of powerpoolGroups) {
      const team = powerpoolTeams.pop();
      if (team) {
        group.teams.push(team);
      } else if (!team && powerpoolTeams.length) {
        // if for some reason there's no team left to add to a group but there should,
        // group draw is invalid - return undefined
        return undefined;
      }
    }
  }

  return powerpoolGroups;
};

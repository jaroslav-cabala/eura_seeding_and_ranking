"use client";

import { useState } from "react";
import { AvailablePlayers } from "./components/AvailablePlayers";
import { AvailableTeams } from "./components/AvailableTeams";
import { ParticipatingTeam } from "./components/types";
import { TournamentDraw } from "./components/TournamentDraw";
import { Player } from "../../api/types";
import { useGetAllAvailableTeams } from "../../api/useGetAllAvailableTeams";
import { useGetPlayersSortedByPointsOfTwoBestResults } from "../../api/useGetPlayersSortedByPointsOfTwoBestResults";

export default function CreateTournament() {
  const [participatingTeams, setParticipatingTeams] = useState<Array<ParticipatingTeam>>([]);

  const addTeamToTheTournament = (
    teamName: string,
    playerOne: Player,
    playerTwo: Player,
    points: number,
    teamId?: string
  ): void => {
    setParticipatingTeams((teams) => [
      ...teams,
      { id: teamId, name: teamName, playerOne, playerTwo, points },
    ]);
  };

  const importTeamsFromFwango = (): void => {
    const players = useGetPlayersSortedByPointsOfTwoBestResults();
    const teams = useGetAllAvailableTeams();

    // solve case where number of substring split by coma is not divisible by 3 -
    // team name or player's name is missing for some reason
    const importedTeamsCsvRows = testData.trim().split(/[\r\n]/);
    const importedTeams: Array<{ name: string; playerOne: string; playerTwo: string }> = [];
    for (const row of importedTeamsCsvRows) {
      const importedTeam = row.split(",");
      importedTeams.push({
        name: importedTeam[0].trim(),
        playerOne: importedTeam[1].trim(),
        playerTwo: importedTeam[2].trim(),
      });
    }

    const _participatingTeams: Array<ParticipatingTeam> = [];
    for (const importedTeam of importedTeams) {
      const existingTeam = teams.find(
        (team) =>
          team.name === importedTeam.name &&
          (team.playerOne.name === importedTeam.playerOne ||
            team.playerOne.name === importedTeam.playerTwo) &&
          (team.playerTwo.name === importedTeam.playerOne || team.playerTwo.name === importedTeam.playerTwo)
      );

      if (existingTeam) {
        _participatingTeams.push(existingTeam);
        break; // team is found in the ranked teams, take the next team
      }

      // team is not found in the ranked teams, it is a new team.
      // But the players might be ranked so we need to look for them
      const existingPlayerOne = players.find((player) => player.name === importedTeam.playerOne);
      const existingPlayerTwo = players.find((player) => player.name === importedTeam.playerTwo);

      _participatingTeams.push({
        name: importedTeam.name,
        playerOne: existingPlayerOne
          ? {
              name: existingPlayerOne.name,
              id: existingPlayerOne.playerId,
              uid: existingPlayerOne.playerUid,
            }
          : { name: importedTeam.playerOne, id: "", uid: "" },
        playerTwo: existingPlayerTwo
          ? {
              name: existingPlayerTwo.name,
              id: existingPlayerTwo.playerId,
              uid: existingPlayerTwo.playerUid,
            }
          : { name: importedTeam.playerTwo, id: "", uid: "" },
        points: (existingPlayerOne?.points ?? 0) + (existingPlayerTwo?.points ?? 0),
      });
    }

    setParticipatingTeams(_participatingTeams);
  };

  return (
    <>
      <AvailablePlayers
        participatingTeams={participatingTeams}
        onTwoPlayersSelected={addTeamToTheTournament}
      />
      <AvailableTeams participatingTeams={participatingTeams} onSelectTeam={addTeamToTheTournament} />
      <TournamentDraw
        participatingTeams={participatingTeams}
        importTeamsFromFwangoHandler={importTeamsFromFwango}
      />
    </>
  );
}

const testData = `
Super team A,Michael Leuwig,Peter Choi
Team 3,Jakub Víšek,Ondřej Čejka
Team 2,Ondra Kasan,Jaroslav Čabala
Hustling Brothers, Levi Vandaele, Yosha Vandaele`;

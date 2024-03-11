"use client";

import { useState } from "react";
import { AvailablePlayers } from "./components/AvailablePlayers";
import { AvailableTeams } from "./components/AvailableTeams";
import { ParticipatingTeam } from "./components/types";
import { TournamentDraw } from "./components/TournamentDraw";
import { Player } from "../../api/types";

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

  return (
    <>
      <AvailablePlayers
        participatingTeams={participatingTeams}
        onTwoPlayersSelected={addTeamToTheTournament}
      />
      <AvailableTeams participatingTeams={participatingTeams} onSelectTeam={addTeamToTheTournament} />
      <TournamentDraw participatingTeams={participatingTeams} />
    </>
  );
}

"use client";

import { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetPlayersSortedByPointsOfTwoBestResults } from "../../api/useGetPlayersSortedByPointsOfTwoBestResults";
import { Player } from "../../api/types";
import { useGetAllAvailableTeams } from "../../api/useGetAllAvailableTeams";

type ParticipatingTeam = {
  id?: string;
  name: string;
  // playerOne?: Pick<Player, "name" | "playerId" | "playerUid">;
  // playerTwo?: Pick<Player, "name" | "playerId" | "playerUid">;
  playerOne: string;
  playerTwo: string;
};

export default function CreateTournament() {
  const [participatingTeams, setParticipatingTeams] = useState<Array<ParticipatingTeam>>([]);

  const addTeamToTheTournament = (
    teamName: string,
    playerOne: string,
    playerTwo: string,
    teamId?: string
  ) => {
    setParticipatingTeams((teams) => [...teams, { id: teamId, name: teamName, playerOne, playerTwo }]);
  };
  const participatingTeamsMarkup = (
    <Grid container spacing={1}>
      <Grid xs={12}>Number of teams: {participatingTeams.length}</Grid>
      <Grid>
        <List>
          <ListSubheader>Teams</ListSubheader>
          {participatingTeams.map((team) => (
            <ListItem key={team.id} disablePadding dense>
              <ListItemButton>
                <ListItemText
                  className="m-0 p-0"
                  primary={team.name}
                  secondary={`${team.playerOne}, ${team.playerTwo}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );

  return (
    <>
      <AvailablePlayers onTwoPlayersSelected={addTeamToTheTournament} />
      <AvailableTeams onSelectTeam={addTeamToTheTournament} />
      {participatingTeamsMarkup}
    </>
  );
}

type AvailablePlayers = ReturnType<typeof useGetPlayersSortedByPointsOfTwoBestResults>;

const AvailablePlayers = (props: {
  onTwoPlayersSelected: (teamName: string, playerOne: string, playerTwo: string) => void;
}) => {
  const players = useGetPlayersSortedByPointsOfTwoBestResults();
  const [availablePlayers, setAvailablePlayers] = useState<AvailablePlayers>(players);
  const [selectedPlayers, setSelectedPlayers] = useState<
    Array<Pick<AvailablePlayers[number], "name" | "playerId">>
  >([]);
  const selectedPlayers_ids = selectedPlayers.map((selectedPlayer) => selectedPlayer.playerId);

  // when 2. player is selected, both are removed from the list of avialable players and
  // moved to tournament teams list as a new team
  const onSelectPlayerHandler = (playerId: string, playerName: string) => {
    if (selectedPlayers.length === 1) {
      const newTeam: ParticipatingTeam = {
        name: `${selectedPlayers[0].name.split(" ").pop()} / ${playerName.split(" ").pop()}`,
        playerOne: selectedPlayers[0].name,
        playerTwo: playerName,
      };

      setAvailablePlayers((availablePlayers) => {
        const updatedAvailablePlayers = [...availablePlayers];
        updatedAvailablePlayers.splice(
          findPlayerIndex(selectedPlayers[0].playerId, updatedAvailablePlayers),
          1
        );
        updatedAvailablePlayers.splice(findPlayerIndex(playerId, updatedAvailablePlayers), 1);
        return updatedAvailablePlayers;
      });
      setSelectedPlayers([]);
      props.onTwoPlayersSelected(newTeam.name, newTeam.playerOne, newTeam.playerTwo);
    } else {
      setSelectedPlayers((selectedPlayers) => [...selectedPlayers, { name: playerName, playerId }]);
    }
  };

  return (
    <List>
      <ListSubheader>Available players {availablePlayers.length}</ListSubheader>
      {availablePlayers.map((player, index) => (
        <ListItemButton
          key={player.playerId}
          dense
          onClick={() => onSelectPlayerHandler(player.playerId, player.name)}
          selected={selectedPlayers_ids.includes(player.playerId)}
          className=" m-0 p-0"
        >
          <ListItemText primary={player.name} />
          <ListItemText primary={player.points} />
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </ListItemButton>
      ))}
    </List>
  );
};

const AvailableTeams = (props: {
  onSelectTeam: (teamName: string, playerOne: string, playerTwo: string, teamId?: string) => void;
}) => {
  const availableTeams = useGetAllAvailableTeams();
  const [teams, setTeams] = useState(availableTeams); // use Set since duplicates are not allowed

  const onSelectTeamHandler = (teamId: string, teamName: string, index: number) => {
    setTeams((teams) => {
      const updatedTeams = [...teams];
      updatedTeams.splice(index, 1);
      return updatedTeams;
    });
    props.onSelectTeam(teamName, "-", "-", teamId);
  };

  return (
    <List>
      <ListSubheader>Available teams</ListSubheader>
      {teams.map((team, index) => (
        <ListItemButton
          key={team.teamId}
          dense
          onClick={() => onSelectTeamHandler(team.teamId, team.name, index)}
          className=" m-0 p-0"
        >
          <ListItemText primary={team.name} />
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
        </ListItemButton>
      ))}
    </List>
  );
};

const findPlayerIndex = (playerId: string, players: AvailablePlayers): number =>
  players.findIndex((player) => playerId === player.playerId);

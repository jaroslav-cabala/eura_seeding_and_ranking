import { useGetPlayersSortedByPointsOfTwoBestResults } from "@/src/app/api/useGetPlayersSortedByPointsOfTwoBestResults";
import { List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { ParticipatingTeam } from "./types";
import { Player } from "@/src/app/api/types";

type AvailablePlayers = ReturnType<typeof useGetPlayersSortedByPointsOfTwoBestResults>;

export const AvailablePlayers = (props: {
  participatingTeams: Array<ParticipatingTeam>;
  onTwoPlayersSelected: (teamName: string, playerOne: Player, playerTwo: Player, points: number) => void;
}) => {
  const players = useGetPlayersSortedByPointsOfTwoBestResults();
  const [availablePlayers, setAvailablePlayers] = useState<AvailablePlayers>(players);
  const [selectedPlayers, setSelectedPlayers] = useState<AvailablePlayers>([]);
  const selectedPlayers_ids = selectedPlayers.map((selectedPlayer) => selectedPlayer.playerId);

  // when 2. player is selected, both are removed from the list of avialable players and
  // moved to tournament teams list as a new team
  const onSelectPlayerHandler = (playerId: string, playerUid: string, playerName: string, points: number) => {
    if (selectedPlayers.length === 1) {
      const firstSelectedPlayer = selectedPlayers[0];
      const newTeam: ParticipatingTeam = {
        name: `${firstSelectedPlayer.name} / ${playerName}`,
        playerOne: {
          name: firstSelectedPlayer.name,
          id: firstSelectedPlayer.playerId,
          uid: firstSelectedPlayer.playerUid,
        },
        playerTwo: { name: playerName, id: playerId, uid: playerUid },
        points: firstSelectedPlayer.points + points,
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
      props.onTwoPlayersSelected(newTeam.name, newTeam.playerOne, newTeam.playerTwo, newTeam.points);
    } else {
      setSelectedPlayers((selectedPlayers) => [
        ...selectedPlayers,
        { name: playerName, playerId, playerUid, points },
      ]);
    }
  };

  const onlyPlayersNotInTheTournament: AvailablePlayers = availablePlayers.filter(
    (player) =>
      !props.participatingTeams.find(
        (team) => team.playerOne.uid === player.playerUid || team.playerTwo.uid === player.playerUid
      )
  );

  return (
    <Grid xs={6} md="auto" lg={3}>
      <List>
        <ListSubheader>Available players {onlyPlayersNotInTheTournament.length}</ListSubheader>
        {onlyPlayersNotInTheTournament
          .sort((a, b) => b.points - a.points)
          .map((player) => (
            <ListItemButton
              key={player.playerId}
              dense
              onClick={() =>
                onSelectPlayerHandler(player.playerId, player.playerUid, player.name, player.points)
              }
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
    </Grid>
  );
};

const findPlayerIndex = (playerId: string, players: AvailablePlayers): number =>
  players.findIndex((player) => playerId === player.playerId);

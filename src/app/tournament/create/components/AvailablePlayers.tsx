import { useGetPlayersSortedByPointsOfTwoBestResults } from "@/src/app/api/useGetPlayersSortedByPointsOfTwoBestResults";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
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
  const [isNewTeamFormOpen, setIsNewTeamFormOpen] = useState<boolean>(false);

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

  const addNewTeamFormSubmitHandler = (formData: FormData): void => {
    const player1Name = formData.get("player1Name") as string;
    const player1Points = formData.get("player1Points") as string;
    const player2Name = formData.get("player2Name") as string;
    const player2Points = formData.get("player2Points") as string;

    if (player1Name && player1Points && player2Name && player2Points) {
      const teamName = `${player1Name} / ${player2Name}`;
      props.onTwoPlayersSelected(
        teamName,
        { name: player1Name, id: "", uid: "" },
        { name: player2Name, id: "", uid: "" },
        Number(player1Points) + Number(player2Points)
      );
    }
  };
  const onlyPlayersNotInTheTournament: AvailablePlayers = availablePlayers.filter((player) => {
    const isPlayerInTheTournament = props.participatingTeams.find(
      (team) => team.playerOne.uid === player.playerUid || team.playerTwo.uid === player.playerUid
    );

    return isPlayerInTheTournament ? false : true;
  });

  return (
    <Grid xs={6} md="auto" lg={2}>
      <FormControlLabel
        value={isNewTeamFormOpen}
        control={<Checkbox />}
        label="Add new team"
        labelPlacement="end"
        onChange={(_, checked) => {
          setIsNewTeamFormOpen(checked);
        }}
      />
      {isNewTeamFormOpen && (
        <form action={addNewTeamFormSubmitHandler}>
          <Grid container xs={12}>
            <Grid xs={12}>New Team</Grid>
            <Grid xs={8}>
              <TextField required name="player1Name" label="Player 1 name" variant="outlined" />
            </Grid>
            <Grid xs={4}>
              <TextField required name="player1Points" label="Points" variant="outlined" />
            </Grid>
            <Grid xs={8}>
              <TextField required name="player2Name" label="Player 2 name" variant="outlined" />
            </Grid>
            <Grid xs={4}>
              <TextField required name="player2Points" label="Points" variant="outlined" />
            </Grid>
            <Button type="submit" variant="outlined">
              Add team to the tournament
            </Button>
          </Grid>
        </form>
      )}
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

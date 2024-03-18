import { useGetAllAvailableTeams } from "@/src/app/api/useGetAllAvailableTeams";
import { List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { ParticipatingTeam } from "./types";
import { Player } from "@/src/app/api/types";

type AvailableTeams = ReturnType<typeof useGetAllAvailableTeams>;

export const AvailableTeams = (props: {
  participatingTeams: Array<ParticipatingTeam>;
  onSelectTeam: (
    teamName: string,
    playerOne: Player,
    playerTwo: Player,
    points: number,
    teamId?: string
  ) => void;
}) => {
  const teams = useGetAllAvailableTeams();
  const [availableTeams, setAvailableTeams] = useState<AvailableTeams>(teams); // use Set since duplicates are not allowed

  const onSelectTeamHandler = (
    teamId: string,
    teamName: string,
    playerOne: Player,
    playerTwo: Player,
    points: number,
    index: number
  ) => {
    setAvailableTeams((teams) => {
      const updatedTeams = [...teams];
      updatedTeams.splice(index, 1);
      return updatedTeams;
    });
    props.onSelectTeam(teamName, playerOne, playerTwo, points, teamId);
  };

  const onlyTeamsWithBothPlayersNotInTheTournament: AvailableTeams = availableTeams.filter(
    (availableTeam) =>
      !props.participatingTeams.find(
        (participatingTeam) =>
          availableTeam.playerOne.uid === participatingTeam.playerOne.uid ||
          availableTeam.playerTwo.uid === participatingTeam.playerOne.uid ||
          availableTeam.playerOne.uid === participatingTeam.playerTwo.uid ||
          availableTeam.playerTwo.uid === participatingTeam.playerTwo.uid
      )
  );

  return (
    <Grid xs={6} md="auto" lg={2}>
      <List>
        <ListSubheader>Available teams {onlyTeamsWithBothPlayersNotInTheTournament.length}</ListSubheader>
        {onlyTeamsWithBothPlayersNotInTheTournament
          .sort((a, b) => b.points - a.points)
          .map((team, index) => (
            <ListItemButton
              key={team.teamId}
              dense
              onClick={() =>
                onSelectTeamHandler(
                  team.teamId,
                  team.name,
                  team.playerOne,
                  team.playerTwo,
                  team.points,
                  index
                )
              }
              className=" m-0 p-0"
            >
              <ListItemText primary={team.name} />
              <ListItemText primary={team.points} />
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
            </ListItemButton>
          ))}
      </List>
    </Grid>
  );
};

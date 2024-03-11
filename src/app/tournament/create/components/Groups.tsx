import { List, ListSubheader, ListItemText, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Group } from "./TournamentDraw";

export const Groups = ({ groups, powerpools }: { groups?: Array<Group>; powerpools?: Array<Group> }) => {
  return (
    <Grid container xs={12} columns={12}>
      {powerpools?.map((powerpool, index) => (
        <Grid key={index} xs={6}>
          <List>
            <ListSubheader>Powerpool {index + 1}</ListSubheader>
            {powerpool.teams.map((team) => (
              <ListItem key={team.id}>
                <ListItemText primary={`${team.name} - ${team.points}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
      {groups?.map((group, index) => (
        <Grid key={index} xs={6}>
          <List>
            <ListSubheader>Group {index + 1}</ListSubheader>
            {group.teams.map((team) => (
              <ListItem key={team.id}>
                <ListItemText primary={`${team.name} - ${team.points}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

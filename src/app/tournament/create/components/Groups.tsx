import { List, ListSubheader, ListItemText, ListItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Group } from "./TournamentDraw";

export const Groups = ({ groups, powerpools }: { groups?: Array<Group>; powerpools?: Array<Group> }) => {
  return (
    <Grid container columns={12}>
      {powerpools?.map((powerpool, index) => (
        <Grid xs={6} md={4} key={index}>
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
        <Grid xs={6} md={4} key={index}>
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

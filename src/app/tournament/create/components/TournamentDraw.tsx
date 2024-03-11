import { List, ListSubheader, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { drawGroups } from "./drawGroups";
import { GroupDrawSettings } from "./GroupDrawSettings";
import { Groups } from "./Groups";
import { ParticipatingTeam } from "./types";

export type TournamentDrawSettings = {
  powerpoolGroups: string;
  powerpoolTeams: string;
  groups: string;
  groupDrawMethod: string;
};

export type TournamentDraw = {
  powerpools?: Array<Group>;
  groups?: Array<Group>;
};

export type Group = {
  teams: Array<ParticipatingTeam>;
};

const TournamentDrawSettingsDefault: TournamentDrawSettings = {
  groupDrawMethod: "snake",
  groups: "",
  powerpoolGroups: "",
  powerpoolTeams: "",
};

export const TournamentDraw = ({ participatingTeams }: { participatingTeams: Array<ParticipatingTeam> }) => {
  const [tournamentDrawSettings, setTournamentDrawSettings] = useState<TournamentDrawSettings>(
    TournamentDrawSettingsDefault
  );

  const [tournamentDraw, setTournamentDraw] = useState<TournamentDraw | undefined>(undefined);

  const drawGroupsHandler = (): void => {
    const drawnGroups = drawGroups(participatingTeams, tournamentDrawSettings);
    setTournamentDraw(drawnGroups);
  };

  return (
    <Grid container xs={12} md="auto" lg={18}>
      <Grid xs={12} md>
        <List>
          <ListSubheader>Teams {participatingTeams.length}</ListSubheader>
          {participatingTeams
            .sort((a, b) => b.points - a.points)
            .map((team) => (
              <ListItem key={team.id} disablePadding dense>
                <ListItemButton>
                  <ListItemText
                    className="m-0 p-0"
                    primary={`${team.name} ${team.points}`}
                    secondary={`${team.playerOne.name}, ${team.playerTwo.name}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid container xs={12} md columns={12}>
        <GroupDrawSettings
          tournamentDrawSettings={tournamentDrawSettings}
          setTournamentDrawSettings={setTournamentDrawSettings}
          drawGroupsHandler={drawGroupsHandler}
        />
        <Groups groups={tournamentDraw?.groups} powerpools={tournamentDraw?.powerpools} />
      </Grid>
    </Grid>
  );
};

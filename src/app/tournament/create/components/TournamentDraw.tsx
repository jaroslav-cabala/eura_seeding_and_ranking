import { List, ListSubheader, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";
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

export const TournamentDraw = ({
  participatingTeams,
  importTeamsFromFwangoHandler,
}: {
  participatingTeams: Array<ParticipatingTeam>;
  importTeamsFromFwangoHandler: () => void;
}) => {
  const [tournamentDrawSettings, setTournamentDrawSettings] = useState<TournamentDrawSettings>(
    TournamentDrawSettingsDefault
  );

  const [tournamentDraw, setTournamentDraw] = useState<TournamentDraw | undefined>(undefined);

  const drawGroupsHandler = (): void => {
    const drawnGroups = drawGroups(participatingTeams, tournamentDrawSettings);
    setTournamentDraw(drawnGroups);
  };

  return (
    <Grid container xs={12} md={4} lg={8}>
      <Grid xs={12} md={5}>
        <Button variant="outlined" onClick={importTeamsFromFwangoHandler}>
          Import teams from Fwango
        </Button>
        <List>
          <ListSubheader>Teams {participatingTeams.length}</ListSubheader>
          {participatingTeams
            .slice()
            .sort((a, b) => b.points - a.points)
            .map((team) => (
              <ListItem key={team.id ?? `${team.playerOne.name}_${team.playerTwo.name}`} disablePadding dense>
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
      <Grid xs={12} md={7}>
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

import { FormControlLabel, Checkbox, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Dispatch, SetStateAction, useState } from "react";
import { TournamentDrawSettings } from "./TournamentDraw";

export const GroupDrawSettings = ({
  tournamentDrawSettings,
  setTournamentDrawSettings,
  drawGroupsHandler,
}: {
  setTournamentDrawSettings: Dispatch<SetStateAction<TournamentDrawSettings>>;
  tournamentDrawSettings: TournamentDrawSettings;
  drawGroupsHandler: () => void;
}) => {
  const [powerpools, setPowerpools] = useState<boolean>(false);

  return (
    <Grid container xs={12} columns={12}>
      <Grid xs={12}>
        <div>Tournament draw settings</div>
      </Grid>
      <Grid xs={4}>
        <FormControlLabel
          value={powerpools}
          control={<Checkbox />}
          label="Powerpools"
          labelPlacement="end"
          onChange={(_, checked) => {
            setPowerpools(checked);
          }}
        />
        {powerpools && (
          <>
            <TextField
              id="outlined-basic"
              label="Powerpool teams"
              variant="outlined"
              value={tournamentDrawSettings.powerpoolTeams}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTournamentDrawSettings((prevVal) => ({
                  ...prevVal,
                  powerpoolTeams: event.target.value,
                }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="Powerpool groups"
              variant="outlined"
              value={tournamentDrawSettings.powerpoolGroups}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTournamentDrawSettings((prevVal) => ({
                  ...prevVal,
                  powerpoolGroups: event.target.value,
                }));
              }}
            />
          </>
        )}
      </Grid>
      <Grid xs={4}>
        <TextField
          id="outlined-basic"
          label="Groups"
          variant="outlined"
          value={tournamentDrawSettings.groups}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTournamentDrawSettings((prevVal) => ({
              ...prevVal,
              groups: event.target.value,
            }));
          }}
        />
      </Grid>
      <Grid xs={4}>
        <Button
          variant="outlined"
          onClick={() => {
            drawGroupsHandler();
          }}
        >
          Draw
        </Button>
      </Grid>
    </Grid>
  );
};

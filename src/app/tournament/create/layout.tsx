import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box minWidth={600} margin={3}>
      <Grid container columns={24} spacing={2}>
        {children}
      </Grid>
    </Box>
  );
}

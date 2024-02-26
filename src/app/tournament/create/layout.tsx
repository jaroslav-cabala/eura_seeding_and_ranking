import { Stack } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0.5} padding={4}>
      {children}
    </Stack>
  );
}

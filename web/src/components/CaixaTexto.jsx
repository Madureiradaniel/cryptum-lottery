import { Chip, Divider, Grid, Stack, Typography } from "@mui/material";

export const CaixaTexto = ({
  isVendedor = false,
  divider = false,
  children,
  enviadoPor,
  nomeVendedor
}) => {
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent={isVendedor ? "flex-start" : "flex-end"}
        >
          <Chip
            color={isVendedor ? "default" : "primary"}
            size="small"
            sx={{ borderRadius: 1 }}
            label={isVendedor ? nomeVendedor : enviadoPor}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent={isVendedor ? "flex-start" : "flex-end"}
          p={1}
        >
          <Typography align={isVendedor ? "left" : "right"} gutterBottom>
            {children}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {divider && <Divider />}
      </Grid>
    </Grid>
  );
};

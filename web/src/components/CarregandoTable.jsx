import { Box, CircularProgress, Stack, Typography } from "@mui/material";

export const CarregandoTable = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            <CircularProgress />
        </Stack>
    );
}

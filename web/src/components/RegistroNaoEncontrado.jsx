import { Box, Stack, Typography } from "@mui/material";

export const RegistroNaoEncontrado = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
        >
            <Box sx={{ mt: 3, textAlign: "center", maxWidth: 120 }}>
                <img
                    alt="vazio"
                    src="/pasta-vazia.png"
                    style={{
                        display: "inline-block",
                        width: '100%',
                    }}
                />
            </Box>
            <Typography color="#363739" variant="body2">
                Nenhum registro encontrado.
            </Typography>
        </Stack>
    );
}

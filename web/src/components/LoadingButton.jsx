import { Button, CircularProgress} from "@mui/material";

export const LoadingButton = ({onClick, loading, children}) => {
  return (
    <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={onClick}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} color="inherit" />}
      >
        {loading ? 'Carregando...' : children}
      </Button>
  );
}

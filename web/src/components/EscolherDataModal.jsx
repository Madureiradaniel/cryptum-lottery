import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, TextField } from "@mui/material";

export default function EscolherDataModal({
  open,
  handleClose,
  dataEscolhida,
  setDataEscolhida,
  setError,
  error,
  title,
  filter,
  handleChengeDataPrevisaoPagamento,
  handleChengeDataPagamento
}) {
  const handleInputChange = (event) => {
    setDataEscolhida(event.target.value);
  };

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 8000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  function handleSalvar() {
    if(filter === "Pendente"){
      handleChengeDataPrevisaoPagamento()
    } else {
      handleChengeDataPagamento()
    }
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
       {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={dataEscolhida}
          onChange={handleInputChange}
          fullWidth
          type="date"
          variant="outlined"
        />
        {error && <Box mt={1}>
        <Alert severity="error">Ocorreu um erro, tente novamente.</Alert>
        </Box>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleSalvar}
          autoFocus
          disabled={!dataEscolhida}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

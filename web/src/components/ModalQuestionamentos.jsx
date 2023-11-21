import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, DialogActions, Grid, TextField } from "@mui/material";
import { CaixaTexto } from "./CaixaTexto";
import { LoadingButton } from "./LoadingButton";
import useFetchGetQuestionamentoMensagem from "../queries/getQuestionamentoMensagem";
import usePlataforma from "../hooks/usePlataforma";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ModalQuestionamentos({
  questionamento = "",
  questionamentoID,
  open,
  nomeVendedor,
  handleCloseModal,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { sendTextQuestionamento } = usePlataforma();

  const handleClose = () => {
    handleCloseModal();
  };

  const { data, isLoading: isLoadingData } =
    useFetchGetQuestionamentoMensagem(questionamentoID);

  const formik = useFormik({
    initialValues: {
      texto: "",
    },
    validationSchema: Yup.object({
      texto: Yup.string().max(255).required("O texto é obrigatório"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        await sendTextQuestionamento(questionamentoID, values.texto);
        setIsLoading(false);
        resetForm();
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Questionamento
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ minWidth: 500 }} />
          </Grid>
          {questionamento && (
            <Grid item xs={12}>
              <CaixaTexto isVendedor divider nomeVendedor={nomeVendedor}>
                {questionamento}
              </CaixaTexto>
            </Grid>
          )}

          {data &&
            data.map((current, index) => (
              <Grid key={current._id} item xs={12}>
                <CaixaTexto
                  isVendedor={current.isVendedor}
                  nomeVendedor={nomeVendedor}
                  divider={index !== data.length - 1}
                  enviadoPor={current.enviadoPor}
                >
                  {current.texto}
                </CaixaTexto>
              </Grid>
            ))}
            
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              size="small"
              fullWidth
              placeholder="Escreva aqui"
              variant="outlined"
              disabled={isLoading || isLoadingData}
              name="texto"
              value={formik.values["texto"]}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(formik.touched["texto"] && formik.errors["texto"])}
              helperText={formik.touched["texto"] && formik.errors["texto"]}
            />
          </Grid>
          <Grid item xs={3}>
            <LoadingButton
              loading={isLoading || isLoadingData}
              onClick={formik.handleSubmit}
            >
              Enviar
            </LoadingButton>
          </Grid>
        </Grid>
      </DialogActions>
    </BootstrapDialog>
  );
}

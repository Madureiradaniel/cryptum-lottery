import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import SendIcon from "@mui/icons-material/Send";
import { RegistroNaoEncontrado } from "./RegistroNaoEncontrado";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { pdfBase64 } from "../data/pdfBase64";
import { imagemBase64 } from "../data/imagemBase64";
import { CarregandoTable } from "./CarregandoTable";
import moment from "moment/moment";
import EscolherDataModal from "./EscolherDataModal";
import { isBase64PDF } from "../utils/isBase64PDF";
import { handleOpenPDF } from "../utils/handleOpenPDF";
import { handleOpenImage } from "../utils/handleOpenImage";
import usePlataforma from "../hooks/usePlataforma";
import { CircularProgress, Snackbar, Stack } from "@mui/material";
import StatusChip from "./StatusChip";

function EnhancedTableToolbar(props) {
  const { numSelected, handleClickChengeDataPrevisaoPagamento, handleClickChengeDataPagamento, filter } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected > 1 ? " - selecionados" : " - selecionado"}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nota Fiscal
        </Typography>
      )}

      {numSelected > 0 && (
        <>
        {filter === "Pendente" && (
          <Tooltip placement="left" title="Registrar previsão de pagamento">
          <IconButton onClick={handleClickChengeDataPrevisaoPagamento}>
            <SendIcon />
          </IconButton>
        </Tooltip>
        )}
        {filter === "Aguardando" && (
          <Tooltip placement="left" title="Registrar data de pagamento">
          <IconButton onClick={handleClickChengeDataPagamento}>
            <SendIcon />
          </IconButton>
        </Tooltip>
        )}
        
        </>
      )}
    </Toolbar>
  );
}

export default function TableNF({
  isLoading,
  data = [],
  totalPages = 0,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  filter
}) {
  
  const [selected, setSelected] = React.useState([]);
  const [openModalEscolherData, setOpenModalEscolherData] = React.useState(false);
  const [dataEscolhida, setDataEscolhida] = React.useState("");
  const [isLoadingSend, setIsLoadingSend] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const { changeDataPrevisaoPagamento, changeDataPagamento } = usePlataforma();
  
  const emptyRows = data.length === 0 ? 4 : 0;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    handleChangePage(null, 0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClickChengeDataPrevisaoPagamento = () => {
    setTitleModal("Data de Previsão de Pagamento")
    setOpenModalEscolherData(true);
  };

  const handleClickChengeDataPagamento = () => {
    setTitleModal("Data do Pagamento")
    setOpenModalEscolherData(true);
  };

  const handleVerNF = (base64) => {
    var isPDF = isBase64PDF(base64);
    if (isPDF) {
      handleOpenPDF(base64);
    } else {
      handleOpenImage(base64);
    }
  };

  const handleClose = () => {
    setSelected([]);
    setOpenModalEscolherData(false);
    setDataEscolhida("");
  };

  const handleChengeDataPrevisaoPagamento = async () => {
   try {
    setError(false)
    setIsLoadingSend(true)
    setOpenModalEscolherData(false)
    await changeDataPrevisaoPagamento(selected, dataEscolhida);
    setIsLoadingSend(false)
    handleClose()
   } catch (error) {
    setError(true)
    setOpenModalEscolherData(true)
    setIsLoadingSend(false)
   }
  };

  const handleChengeDataPagamento = async () => {
   try {
    setError(false)
    setIsLoadingSend(true)
    setOpenModalEscolherData(false)
    await changeDataPagamento(selected, dataEscolhida);
    setIsLoadingSend(false)
    handleClose()
   } catch (error) {
    setError(true)
    setOpenModalEscolherData(true)
    setIsLoadingSend(false)
   }
  };


  React.useEffect(() => {
    setSelected([])
  }, [filter]);
    

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          filter={filter}
          numSelected={selected.length}
          handleClickChengeDataPrevisaoPagamento={handleClickChengeDataPrevisaoPagamento}
          handleClickChengeDataPagamento={handleClickChengeDataPagamento}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Tooltip title="Selecionar todos">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < data.length
                      }
                      checked={
                        data.length > 0 && selected.length === data.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Previsão de pagamento</TableCell>
                <TableCell>Data pagamento</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Situação</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {moment(row.periodoDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{row.nomeUsuario}</TableCell>
                    <TableCell>
                      {row.data_previsao_pagamento ? moment(row.data_previsao_pagamento).format("DD/MM/YYYY") : "-"}
                    </TableCell>
                    <TableCell>
                    {row.data_pagamento ? moment(row.data_pagamento).format("DD/MM/YYYY") : "-"}
                    </TableCell>
                    <TableCell>{row.valor_nf.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                    <TableCell><StatusChip status={row.situacao} /></TableCell>
                    <TableCell>
                      <Tooltip title="VER NF">
                        <IconButton onClick={() => handleVerNF(row.base64_nf)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}>
                    {isLoading && data.length === 0 ? (
                      <CarregandoTable />
                    ) : (
                      <RegistroNaoEncontrado />
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}–${to} de ${
              count !== -1 ? count : `mais do que ${to}`
            }`;
          }}
        />
      </Paper>
      <EscolherDataModal
        dataEscolhida={dataEscolhida}
        setDataEscolhida={setDataEscolhida}
        handleClose={handleClose}
        open={openModalEscolherData}
        error={error}
        setError={setError}
        title={titleModal}
        filter={filter}
        handleChengeDataPrevisaoPagamento={handleChengeDataPrevisaoPagamento}
        handleChengeDataPagamento={handleChengeDataPagamento}
      />
       <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isLoadingSend}
        message={ 
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{width: "100%"}}
          >
             <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{width: "100%"}}
          >
            <CircularProgress size={20} />
            <Typography>Carregando...</Typography>
          </Stack>
          </Stack>} />
    </Box>
  );
}

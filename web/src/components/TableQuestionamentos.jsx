import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment/moment";
import TablePagination from "@mui/material/TablePagination";
import { RegistroNaoEncontrado } from "./RegistroNaoEncontrado";
import { CarregandoTable } from "./CarregandoTable";



export default function TableQuestionamentos({
  isLoading,
  data = [],
  totalPages = 0,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  handleOpenModal,
}) {

  const emptyRows = data.length === 0 ? 4 : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    handleChangePage(null, 0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>PERÍODO</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Assunto</TableCell>
                <TableCell>Recebido</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => {

                return (
                  <TableRow
                    hover
                    key={row._id}
                  >
                    <TableCell component="th" scope="row">   
                    {moment(row.periodoDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{row.nomeUsuario}</TableCell>
                    <TableCell>{row.assunto}</TableCell>
                    <TableCell>{moment(row.createdAt).format("DD/MM - HH:mm")}</TableCell>
                    <TableCell>
                      <Tooltip title="VER QUESTIONAMENTO">
                        <IconButton onClick={() => handleOpenModal(row.questionamento, row._id, row.nomeUsuario)}>
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
    </Box>
  );
}

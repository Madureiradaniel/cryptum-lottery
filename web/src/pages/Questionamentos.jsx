import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import TableQuestionamentos from "../components/TableQuestionamentos";
import ModalQuestionamentos from "../components/ModalQuestionamentos";
import { useState } from "react";
import useFetchGetQuestionamento from "../queries/getQuestionamento";
import { FilterButtonsQuestionamento } from "../components/FilterButtonsQuestionamento";

export const Questionamentos = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [questionamento, setQuestionamento] = useState(null)
  const [questionamentoID, setQuestionamentoID] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [nomeVendedor, setNomeVendedor] = useState('');
  const [filter, setFilter] = useState('Pendente');

  const { data, isLoading } = useFetchGetQuestionamento(page, limit, filter);

  const handleOpenModal = (questionamento, questionamentoID, nomeVendedor) => {
    setNomeVendedor(nomeVendedor)
    setModalOpen(true)
    setQuestionamentoID(questionamentoID)
    setQuestionamento(questionamento)
  }

  const handleCloseModal = () => {
    setNomeVendedor("")
    setModalOpen(false)
    setQuestionamentoID(null)
    setQuestionamento(null)
  }

  return (
    <DashboardLayout>
      <Box component="main">
        <Container maxWidth={false}>
          <Box mt={2}>
            <Typography variant="h4">Questionamentos</Typography>
          </Box>
          <Box mt={6}>
             <FilterButtonsQuestionamento filter={filter} setFilter={setFilter} />
            <TableQuestionamentos
            isLoading={isLoading}
            data={data && data.docs}
            totalPages={data && data.totalPages}
            page={page}
            setPage={setPage}
            rowsPerPage={limit}
            setRowsPerPage={setLimit} 
            handleOpenModal={handleOpenModal} 
            />
          </Box>
        </Container>
      </Box>
      {questionamentoID &&
      <ModalQuestionamentos 
      open={modalOpen} 
      questionamentoID={questionamentoID} 
      handleCloseModal={handleCloseModal}
      questionamento={questionamento}
      nomeVendedor={nomeVendedor}
      />}
    </DashboardLayout>
  );
};

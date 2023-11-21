import { useQuery } from "react-query";
import api from "../../service/api";

async function getQuestionamentoMensagem(ctx) {
  const [, questionamentoID] = ctx.queryKey
  const { data } = await api.get(`/operador/questionamento/mensagens/${questionamentoID}`)
  return data
}

export default function useFetchGetQuestionamentoMensagem(questionamentoID) {
    return useQuery(['getQuestionamentoMensagem', questionamentoID], getQuestionamentoMensagem, { refetchOnWindowFocus: true})
}
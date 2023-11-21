import { useQuery } from "react-query";
import api from "../../service/api";

async function getQuestionamento(ctx) {
  const [, page, limit, filter] = ctx.queryKey
  const { data } = await api.get('/operador/questionamentos', { params: { page, limit, filter } })
  return data
}

export default function useFetchGetQuestionamento(page, limit, filter) {
    return useQuery(['getQuestionamento', page, limit, filter], getQuestionamento, { refetchOnWindowFocus: true})
}
import { useQuery } from "react-query";
import api from "../../service/api";

async function getPedidos(params) {
  const [, ativo, tipo, dataPedido, max, periodKey] = params.queryKey
  const { data } = await api.get('listarPedidos', { params: { ativo, tipo, dataPedido, max, periodKey } })
  return data
}

export default function useFetchGetPedidos(ativo, tipo, dataPedido, max, periodKey) {
    return useQuery(['getPedidos', ativo, tipo, dataPedido, max, periodKey], getPedidos, {
      //  refetchInterval: 60000, refetchIntervalInBackground:true
          refetchInterval: false
       })
}
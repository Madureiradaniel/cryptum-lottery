import { useQuery } from "react-query";
import api from "../../service/api";

async function getEntregadores() {
  const { data } = await api.get('entregadores')
  return data
}

export default function useFetchGetEntregadores() {
    return useQuery(['getEntregadores'], getEntregadores)
}
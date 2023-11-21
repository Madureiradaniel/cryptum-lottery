import { useQuery } from "react-query";
import api from "../../service/api";

async function getLottery() {
  const { data } = await api.get(`/lottery/655c122cbfa49110e68a379a`)
  return data
}

export default function useFetchGetLottery() {
    return useQuery(['getLottery'], getLottery, {refetchOnWindowFocus: true})
}
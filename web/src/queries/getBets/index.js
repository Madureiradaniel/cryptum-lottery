import { useQuery } from "react-query";
import api from "../../service/api";

async function getBets(ctx) {
  const [, wallet] = ctx.queryKey
  console.log(wallet)
  const { data } = await api.get(`/bet/${wallet}`)
  return data
}

export default function useFetchGetBets(wallet) {
    return useQuery(['getBets', wallet], getBets, { refetchInterval: 20000, refetchOnWindowFocus: true})
}
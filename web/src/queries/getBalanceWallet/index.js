import { useQuery } from "react-query";
import api from "../../service/api";

async function getBalance(ctx) {
  const [, wallet] = ctx.queryKey
  console.log(wallet)
  const { data } = await api.get(`/wallet/${wallet}`)
  return data
}

export default function useFetchGetBalance(wallet) {
    return useQuery(['getBalance', wallet], getBalance, { refetchInterval: 30000, refetchOnWindowFocus: true})
}
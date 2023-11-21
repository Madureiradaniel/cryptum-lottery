import Swal from 'sweetalert2';
import api from "../service/api"
import { useQueryClient } from "react-query";
import useData from '../providers/useToken';


const usePlataforma = () => {
    const queryClient = useQueryClient();
    const setData = useData((state) => state.setData)


    const authLogin = async (email) => {
        try {
            const { data } = await api.post("wallet", {
               email
            })
            setData(data)
            return
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: error.response.data.message,
            });
            return
        }
    }

    const sendTextQuestionamento = async (questionamentoID, texto) => {
        try {
            await api.post(`/operador/questionamento/mensagens/${questionamentoID}`, { texto })
            queryClient.invalidateQueries(['getQuestionamentoMensagem'])
            queryClient.invalidateQueries(['getQuestionamento'])
            return
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: error.response.data.message,
            });
            return
        }
    }

    const changeDataPrevisaoPagamento = async (registros, data_previsao_pagamento) => {
        try {
            await api.patch("/operador/notafiscal/data_previsao_pagamento", { registros, data_previsao_pagamento });
            queryClient.invalidateQueries(['getNotasFiscais']);
            Swal.fire({
                icon: 'success',
                title: 'Atenção',
                text: registros.length > 1 ? "Registros alterados com sucesso!" : "Registro alterado com sucesso!",
            });
            return
        } catch (error) {
            throw error;
        }
    };

    const changeDataPagamento = async (registros, data_pagamento) => {
        try {
            await api.patch("/operador/notafiscal/data_pagamento", { registros, data_pagamento });
            queryClient.invalidateQueries(['getNotasFiscais']);
            Swal.fire({
                icon: 'success',
                title: 'Atenção',
                text: registros.length > 1 ? "Registros alterados com sucesso!" : "Registro alterado com sucesso!",
            });
            return
        } catch (error) {
            throw error;
        }
    };

    const handleMarcarEntregador = async (entregador, pedidos) => {
        try {
            await api.post(`marcarMotoboy`, {
                entregador,
                pedidos
            })
        } catch (error) {
            throw error;
        }
    }

    const handlerPlay =  async (idLottery) => {
        try {
            const { data } = await api.get(`lottery/start/${idLottery}`)
            return data
        } catch (error) {
            throw error;
        }
    }

    const handlerPause =  async (idLottery) => {
        try {
           const { data } = await api.get(`lottery/stop/${idLottery}`)
           return data
        } catch (error) {
            throw error;
        }
    }

    const handleSaveBet = async (betNumbers, wallet_address, idLottery) => {
        try {
            await api.post(`bet`, {
                betNumbers, wallet_address, idLottery
            })
        } catch (error) {
            throw error;
        }
    }


    return {
        authLogin,
        sendTextQuestionamento,
        changeDataPrevisaoPagamento,
        changeDataPagamento,
        handleMarcarEntregador,
        handlerPlay,
        handlerPause,
        handleSaveBet
    };
}

export default usePlataforma;

import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchGetLottery from "../queries/getLottery";
import useFetchGetBets from "../queries/getBets"
import Typography from "@mui/material/Typography"

import usePlataforma from "../hooks/usePlataforma";
import useData from "../providers/useToken";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import useFetchGetBalance from "../queries/getBalanceWallet";


function BasicTable({ data, play, pause }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Subscription ID</TableCell>
            <TableCell>Balance VRF</TableCell>
            <TableCell>Automation ID</TableCell>
            <TableCell>Balance Upkeep</TableCell>
            <TableCell>round</TableCell>
            <TableCell>last Block</TableCell>
            <TableCell>Interval</TableCell>
            <TableCell>Next Round</TableCell>
            <TableCell>Paused</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={data.lottery._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {data.subscription.subscription_id}
            </TableCell>
            <TableCell >{data.subscription.balance}</TableCell>
            <TableCell>{`${data.lottery.upkeepId.slice(0, 4)}...${data.lottery.upkeepId.slice(-4)}`}</TableCell>
            <TableCell >{data.automation.balance}</TableCell>
            <TableCell >{data.subscription.fulfillments}</TableCell>
            <TableCell >{data.subscription.last_block_number}</TableCell>
            <TableCell >{data.interval}</TableCell>
            <TableCell >{Number(data.subscription.last_block_number) + Number(data.interval)}</TableCell>
            <TableCell >{`${data.automation.paused}`}</TableCell>
            <TableCell >{data.automation.paused ?
              <PlayCircleIcon style={{ cursor: 'pointer' }} onClick={() => play(data.lottery._id)} />
              :
              <PauseCircleIcon tyle={{ cursor: 'pointer' }} onClick={() => pause(data.lottery._id)} />
            }</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const LatestRandomWord = ({ randomWord }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Last generated Numbers (Random Word)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key="random_word"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center" component="th" scope="row">
              {`${randomWord.match(/.{1,2}/g)}` || "Waiting for new numbers"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const YourLatestRandomWord = ({ bets }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Your numbers (Random Word)</TableCell>
            <TableCell align="center">Numbers</TableCell>
            <TableCell align="center">Round</TableCell>
            <TableCell align="center">Winner</TableCell>
            <TableCell align="center">Hits</TableCell>
            <TableCell align="center">Closed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bets.map(row =>
            <TableRow
              key="random_word"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {`${row.betNumbers}`}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {`${row.sorted_numbers}`}
              </TableCell>
              <TableCell align="center">
                {row.round}
              </TableCell>
              <TableCell align="center">
                {`${row.winner == undefined ? "" : row.winner}`}
              </TableCell>
              <TableCell align="center">
                {row.hits}
              </TableCell>
              <TableCell align="center">
                {`${row.isClosed}`}
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export const Dashboard = ({ redirect }) => {
  let navigate = useNavigate();
  const wallet = useData((state) => state.data);
  // console.log(wallet)

  React.useEffect(() => {
    if (redirect) {
      navigate("/", { replace: true });
    }
  }, [redirect]);

  const { handlerPlay, handlerPause, handleSaveBet } = usePlataforma();

  const { data: lottery, isLoading: isLoadingLottery, isFetching, refetch } = useFetchGetLottery()
  const { data: bets, isLoading: isLoadingBet, isFetching: isFetchingBet, refetch: refetchBet } = useFetchGetBets(wallet.wallet.address)
  const { data: balance, isFetching: isFetchingWallet } = useFetchGetBalance(wallet.wallet.address)
  const [betNumbers, setBetNumbers] = useState(Array.from({ length: 10 }))
  const [hash, setHash] = useState("")

  const Play = async (idLottery) => {
    console.log("play: ", idLottery)
    const response = await handlerPlay(idLottery)
    console.log(response)
    setHash(response.hash)
    refetch()
  }

  const Pause = async (idLottery) => {
    console.log("pause: ", idLottery)
    const response = await handlerPause(idLottery)
    console.log(response)
    setHash(response.hash)
    refetch()
  }

  const handleChangeBetNumbers = (value, index) => {
    const copyNumbers = [...betNumbers]
    copyNumbers[index] = value
    setBetNumbers(copyNumbers)
  }

  const handleSendBet = async () => {
    await handleSaveBet(betNumbers, wallet.wallet.address, lottery.lottery._id)
    if (Number(balance.balances[0].amount) <= 0.1) {
      return toast.error("Insufficient funds!")
    }
    toast.success("Success!")
    // setBetNumbers(Array.from(({ length: 10 })))
    refetchBet()
  }

  return (
    <DashboardLayout>
      <Box component="main">
        <Container maxWidth={true}>
          <Box sx={{ width: "100%" }} mt={5}>
            {!isFetching ?
              <Grid item>
                <Typography>
                  MATIC 1 | USD $ {lottery.price.USD}
                </Typography>
              </Grid>
              :
              <Grid item>
                <Typography>
                  MATIC 1 | USD $ ...
                </Typography>
              </Grid>
            }
            {(!isFetching && !isFetchingWallet) ?
              <Grid item>
                <Typography>
                  YOUR BALANCE MATIC {balance.balances[0].amount} | USD ${wallet.balance.balances[0].amount * Number(lottery.price.USD)}
                </Typography>
              </Grid>
              :
              <Grid item>
                <Typography>
                  YOUR BALANCE MATIC .... | USD $ ...
                </Typography>
              </Grid>
            }
            <Grid item>
              <Typography>
                AWARD: 0.025 MATIC
              </Typography>
            </Grid>
          </Box>
          <Box sx={{ width: "100%" }} mt={5}>
            <Card >
              <Grid item>
                <Box margin={5}>
                  {!isLoadingLottery && <BasicTable data={lottery} play={Play} pause={Pause} />}
                </Box>
                <Box margin={5}>
                  {hash && <a href={`https://mumbai.polygonscan.com/tx/${hash}`} target="_blank">hash:{hash}</a>}
                </Box>
              </Grid>
              {(isFetching || isFetchingBet) && <LinearProgress />}
            </Card>
          </Box>
          <Box sx={{ width: "100%" }} mt={5}>
            <Card >
              <Grid item>
                <Box margin={5}>
                  {!isLoadingLottery && <LatestRandomWord randomWord={lottery.randomWords.length > 0 ? lottery.randomWords[0] : ""} />}
                </Box>
              </Grid>
            </Card>
          </Box>
          <Box sx={{ width: "100%" }} mt={5}>
            <Card >
              <Grid item>
                <Box margin={5}>
                  {!isLoadingBet && <YourLatestRandomWord bets={bets} />}
                </Box>
              </Grid>
              <Grid item>
                <Box margin={5}>

                  {Array.from(({ length: 10 }))
                    .map((row, index) =>
                      <TextField
                        style={{ margin: "5px" }}
                        id={`number_${index}`}
                        label={`number: ${index + 1}`}
                        inputProps={{ maxLength: 2 }}
                        variant="outlined"
                        // disabled={ }
                        value={betNumbers[index]}
                        onChange={(event) => handleChangeBetNumbers(event.target.value, index)}
                      />)
                  }
                </Box>
              </Grid>
              <Grid item>
                <Box margin={5}>
                  <Button sx={{ marginRight: 2 }} fullWidth variant="contained" onClick={() => handleSendBet()}>Save new Bet</Button>
                </Box>
              </Grid>
            </Card>
          </Box>
          <ToastContainer />
        </Container>
      </Box>
    </DashboardLayout>
  );
};

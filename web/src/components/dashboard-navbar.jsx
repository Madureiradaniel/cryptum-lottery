import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useToken from '../providers/useToken';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const setToken = useToken((state) => state.setData)

  function handleSair() {
    setToken('')
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={(e) => {
            e.preventDefault()
            window.open("https://mumbaifaucet.com", "_blank")
          }}>
            <Typography sx={{ ml: 1 }} >
              FAUCETS
            </Typography>
          </IconButton>
          <IconButton onClick={(e) => {
            e.preventDefault()
            window.open("https://mumbai.polygonscan.com", "_blank")
          }}>
            <Typography sx={{ ml: 1 }} >
              POLYGON | TESTNET
            </Typography>
          </IconButton>
          <Tooltip title="Sair" >
            <IconButton sx={{ ml: 1 }} onClick={handleSair}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};


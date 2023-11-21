import { Box, Divider, Drawer, Typography, useMediaQuery, Link } from '@mui/material';
import { NavItem } from './nav-item.jsx';
import useData from '../providers/useToken';
import React from "react";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import walletIco from '../assets/wallet.png'

const items = [
  {
    href: '/',
    icon: (<SpaceDashboardIcon fontSize="small" />),
    title: 'Lottery'
  }
];

export const DashboardSidebar = (props) => {
  const wallet = useData((state) => state.data)
  const { open, onClose } = props;
  
  
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box>
          <Box sx={{ p: 3 }}>
            <Link
              href="/"
            >
              <Box sx={{ml: 3}}>
                <img src={walletIco} alt="logo" width='60%'/>
              </Box>
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box>
              <Box>
                <Typography
                  color="inherit"
                  variant="caption"
                  style={{ fontSize: '10px'}}
                >
               Address: {wallet ? wallet.wallet.address : ''} 
                </Typography>
                {/* <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  {user ? user.email : ''} 
                </Typography> */}
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        {/* <Divider sx={{ borderColor: '#2D3748' }} /> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

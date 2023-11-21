import React from 'react';
import Chip from '@mui/material/Chip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const StatusChip = ({ status }) => {
  let icon;
  let color;

  switch (status) {
    case 'Pendente':
      icon = <ErrorOutlineIcon />;
      color = 'warning';
      break;
    case 'Aguardando':
      icon = <ArrowCircleUpIcon />;
      color = 'info';
      break;
    case 'Pago':
      icon = <CheckCircleOutlineIcon />;
      color = 'success';
      break;
    default:
      icon = null;
      color = 'default';
  }

  return (
    <Chip
      sx={{borderRadius: 1}}
      label={status}
      icon={icon}
      color={color}
      size="small"
    />
  );
};

export default StatusChip;

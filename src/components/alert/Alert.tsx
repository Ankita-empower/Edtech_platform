import React, { SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { hideAlert } from '../../redux/slices/alertSlice';
import { RootState } from '../../redux/store/store';

// Custom Alert component for better TypeScript compatibility
const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(function CustomAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state: RootState) => state.alert);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return; // Prevent closing on outside click
    dispatch(hideAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at the top-right
    >
      <CustomAlert onClose={handleClose} severity={severity}>
        {message}
      </CustomAlert>
    </Snackbar>
  );
};

export default Alert;

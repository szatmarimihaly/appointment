"use client";

import CircularProgress from '@mui/material/CircularProgress';

const SuspenseSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        <CircularProgress size={30} sx={{ color : "white" }}/>
    </div>
  )
}

export default SuspenseSpinner
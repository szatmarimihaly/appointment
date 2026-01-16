"use client";

import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';

export default function ArrowBlack(){
    return(
        <button
            className='bg-black px-4 py-2 rounded'
        >
            <ArrowOutwardOutlinedIcon sx={{ color : "white" }} fontSize='small'/>
        </button>
    )
}
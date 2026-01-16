"use client";

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Link from 'next/link';

const CreateCompany = () => {
  return (
    <Link
        className='flex items-center gap-2 text-white bg-foreground px-4 py-2 rounded hover:cursor-pointer font-bold'
        href={"/dashboard/company/create"}
    >
        <AddCircleOutlinedIcon/>Create company
    </Link>
  )
}

export default CreateCompany
"use client";

import React from 'react';

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onModelClose: () => void;
}

 const CustomDialog: React.FC<CustomDialogProps> =({isOpen, title, message, onModelClose})=> {

  return ( isOpen &&
    <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
      </div>
      <div className="relative w-full transition my-auto p-4">
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative mx-auto max-w-s">
          <div className='text-[16px] font-semibold'>{title}</div>
          <div className='mt-[10px] text-[14px]'>{message}</div>
          <button type="button" className="mt-[14px] text-[#BCE7FF] bg-[#48A5DA] hover:bg-[#48A5DA] focus:ring-[#48A5DA] font-medium rounded-[6px] text-sm px-8 py-[8px] dark:bg-[#48A5DA] dark:hover:bg-[#48A5DA] focus:outline-none dark:focus:ring-[#48A5DA] cursor-pointer flex mr-[0px] ml-auto" onClick={()=>onModelClose()}> Close</button>
        </div>
      </div>
    </div>
  );
}

export default CustomDialog;
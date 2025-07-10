"use client";

import Image from 'next/image';
import kyndrylSvg from '../img/Healthcare_AI_Assist.svg';
import UserSVg from '../img/user.svg';
import UserFilledSVg from '../img/user--avatar--filled.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainHeader() {

  const userName = localStorage.getItem('userName');
  const [isLogin, setIsLogin] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const router = useRouter();

  const signOut = () => {
    localStorage.clear();
    setIsLogOut(true);
    router.push('/login');
  }

  return (
    <div className='green-bg'>
      <header className="app-header">
        <div className='flex'>
          <div className="flex h-[48px] px-[20px]" >
            <Image src={kyndrylSvg} height={24} alt="logo" priority={true} />
          </div>
          <div className='ml-auto '>
            <div className='p-[10px] cursor-pointer' onClick={() => setIsLogin(!isLogin)}>
              <Image src={UserSVg} height={24} alt="logo" priority={true} />
            </div>
          </div>
        </div>
        {isLogin &&
          <div className="absolute left-auto right-0 mr-[10px] flex flex-col bg-white shadow-sm border border-slate-200 w-70 p-6 float-right z-50 ">
            <div className="flex items-center mb-4">
              <Image src={UserFilledSVg} height={24} alt="logo" priority={true} />
              <div className="ml-3 text-[14px] text-xl font-semibold">{userName}</div>
            </div>
            {!isLogOut && <div>
              <div className='text-[14px] cursor-pointer hover:underline hover:text-[#29707A] decoration-[#29707A]' onClick={() => signOut()}>Signout</div>
            </div>}
          </div>}
      </header>
    </div>
  );
}
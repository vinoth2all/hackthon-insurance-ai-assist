"use client";

import KynIcon from './../img/chat-bot.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatBotComponent from './chatbot-component';
import CloseIcon from '../img/close.svg';


function DashboardPage() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') !== "yes") {
            router.push('/login');
        }
    }, []);

    const handleClick = () => {
        setIsOpen(true);
    }

    const onClose=()=>{
        setIsOpen(false);
    }

    return (
        <div className='w-full h-[calc(100vh_-_48px)] text-[#3d3c3c] flex hd-shadow'>
            <div className="fixed bottom-6 right-6">
                <button className="fixed bottom-6 right-6 bg-[#29707A] p-[2px] rounded-full shadow-lg shadow-[#29707A/50] hover:bg-[#29707A] transition-all z-50 flex items-center justify-center h-[48px] w-[48px] cursor-pointer" aria-label="chat_ai" onClick={handleClick}>
                    <Image src={KynIcon} alt="sre_icon" height={28} />
                </button>
            </div>
            {isOpen && <div className='w-full h-full'>
                <div className='model dg-shadow bg-gray-50'>
                    <div className='green-bg px-[20px] py-[10px] border-b-[1px] border-[#9BEECA]'> Healthcare Assistant 
                        <Image src={CloseIcon} height={22} alt="close" className='float-right cursor-pointer' onClick={onClose}></Image>
                    </div>
                    <ChatBotComponent />
                </div>
            </div>
            }
        </div>
    )

}

export default DashboardPage;
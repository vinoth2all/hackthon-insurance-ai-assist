"use client";

import KynIcon from './../img/chat-bot.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatBotComponent from './chatbot-component';
import CloseIcon from '../img/close.svg';
import * as utils from "../utils/utils";
import AxiosInstance from '../utils/axiosInstance';

function DashboardPage() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const userName = localStorage.getItem('userName');
    const [ticketsData, setTicketsData] = useState([]);
    const userId: string = userName !== null ? userName : '';

    useEffect(() => {
        if (localStorage.getItem('isAuthenticated') !== "yes") {
            router.push('/login');
        } else {
            loadTicketData();
        }
    }, []);

    const loadTicketData = async () => {
        try {
            const reqPath = utils.ALL_TICKETS + "/" + userId;
            const response = await AxiosInstance?.get(reqPath, {})
            if (response.status === 200) {
                const data = response?.data === undefined ? [] : response?.data?.data;
                setTicketsData(data);
            }
        } catch (error) {
            console.log(error)
            //console.log(ticketsData)
        }
    }

    const handleClick = () => {
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const getColor=(vl: string)=>{
        if(vl==='Approved') {
            return "#4CDD84";
        }else if (vl==='Rejected') {
            return "#DA1E28";
        } else {
            return "#FF832B";
        }
    }

    return (
        <div className='w-full h-screen  flex flex-col hd-shadow py-6 px-16'>
            <div>
              {ticketsData.length > 0 && <div className='flex relative px-[15px] py-[10px]'>
                    {/* {header.map((headerItem, index) => {
                        return <div key={index} className='w-[10%] text-[14px] text-[#5D5C5C] font-semibold '> {headerItem}</div>
                    })} */}
                    <div className='w-[8%] text-[14px] text-[#5D5C5C] font-semibold'>Ticket Id</div>
                    <div className='w-[8%] text-[14px] text-[#5D5C5C] font-semibold'>Customer Id</div>
                    <div className='w-[8%] text-[14px] text-[#5D5C5C] font-semibold'>Policy Id</div>
                    <div className='w-[10%] text-[14px] text-[#5D5C5C] font-semibold'>Type Of Request</div>
                    <div className='w-[10%] text-[14px] text-[#5D5C5C] font-semibold'>Submitted Date</div>
                    <div className='w-[10%] text-[14px] text-[#5D5C5C] font-semibold'>Reviewed By</div>
                    <div className='w-[13%] text-[14px] text-[#5D5C5C] font-semibold'>AI Response</div>
                    <div className='w-[10%] text-[14px] text-[#5D5C5C] font-semibold'>Ticket Status</div>
                    <div className='w-[11%] text-[14px] text-[#5D5C5C] font-semibold'>Approval Status</div>
                    <div className='w-[12%] text-[14px] text-[#5D5C5C] font-semibold'>Comments</div>
                </div> }
                <div className='relative mt-[10px] '>
                    {ticketsData.length > 0 && ticketsData.map((item, index) => {
                        const approve_color = getColor(item['approval_status']);
                        return <div key={index}><div className='flex card px-[15px] py-[10px] mb-[5px]' key={index}>
                            <div className='w-[8%] text-[#3d3c3c] text-[14px]'> {item['ticket_id']}</div>
                            <div className='w-[8%] text-[#3d3c3c] text-[14px]'> {item['customer_id']}</div>
                            <div className='w-[8%] text-[#3d3c3c] text-[14px]'> {item['policy_id']}</div>
                            <div className='w-[10%] text-[#3d3c3c] text-[14px]'> {item['type_of_request']}</div>
                            <div className='w-[10%] text-[#3d3c3c] text-[14px]'> {item['submitted_date']}</div>
                            <div className='w-[10%] text-[#3d3c3c] text-[14px]'> {item['reviewed_by']}</div>
                            <div className='w-[13%] text-[#3d3c3c] text-[14px]'> {item['ai_response']}</div>
                            <div className='w-[10%] text-[#3d3c3c] text-[14px]'> {item['ticket_status']}</div>
                            <div className="w-[11%] text-[14px]" style={{ color: approve_color }}> {item['approval_status']}</div>
                            <div className='w-[12%] text-[#3d3c3c] text-[14px]'> {item['comments']}</div>
                        </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="fixed bottom-6 right-6">
                <button className="fixed bottom-6 right-6 bg-[#29707A] p-[2px] rounded-full shadow-lg shadow-[#29707A/50] hover:bg-[#29707A] transition-all z-50 flex items-center justify-center h-[48px] w-[48px] cursor-pointer" aria-label="chat_ai" onClick={handleClick}>
                    <Image src={KynIcon} alt="sre_icon" height={28} />
                </button>
            </div>
            {isOpen && <div className='w-full h-full'>
                <div className='model dg-shadow bg-gray-50'>
                    <div className='green-bg px-[20px] py-[10px] border-b-[1px] border-[#9BEECA]'> Insurance AI Assist
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
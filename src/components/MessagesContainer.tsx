"use client";

import { useEffect, useRef } from "react";
import { UserMessageBox } from "./UserMessageBox";
import BotIcon from '../img/bot-ai-icon.svg';
import Image from 'next/image';

interface MessagesContainerProps {
    messages: Message[];
    isResponse: boolean;
    applyFix:(name: boolean) => void;
}

interface Message {
    message: string;
    ts: timestamp;
    isbotmessage: boolean;
}

interface timestamp {
    ist: string;
    utc: string;
}


export const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, isResponse, applyFix }) => {

    const scroll = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (scroll.current) {
            scrollToBottom();
        }
    });

    const scrollToBottom = () => {
        scroll?.current?.scrollTo(0, scroll.current?.scrollHeight);
    }

    const createBotMessages = () => {
        return messages.map((item, index) =>
            <UserMessageBox key={index} message={item?.message} appearance={item?.isbotmessage ? "left" : "right"} timestamp={item?.ts} applyFix={applyFix}/>
        );
    }


    return (
        //   <ul className="messages" ref="scroll">
        /* @ts-expect-error: Unreachable code error */
        <div className={messages.length > 3 ? "messages px-[10px] py-[5px]" : 'w-full h-[68vh] px-[10px] py-[5px]'} ref={scroll}>
            <div className="w-[98%]">
                {createBotMessages()}
                {isResponse &&
                    <div className='flex'>
                        <Image src={BotIcon} alt="sre_icon" height={48} width={48} />
                        <div className='ry-loader h-[20px] ml-[30px] mt-[15px]'> </div>
                    </div>}
            </div>
        </div>
    );
}

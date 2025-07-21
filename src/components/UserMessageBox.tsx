"use client";
import Image from 'next/image';
import BotIcon from '../img/aI_blue_icon.svg';
//import { useState } from 'react';
//import * as utils from '../utils/utils';

interface UserMessageBoxProps {
    appearance: string;
    message: Response | string;
    timestamp: timestamp;
    applyFix: (name: boolean) => void;
}

interface timestamp {
    ist: string;
    utc: string;
}

// interface CheckResults {
//     status_check_results: Services | undefined;
//     diagnostic_insights?: Result;
//     remediation_actions?: Result;
//     reasoning?: string;
//     recommendation?: string;
// }

// interface Services {
//     services: Result | null | undefined;
// }

// interface Result {
//     [key: string]: string;
// }

interface Response {
    message?: string;
    message_time?: string;
    ref_num?: string;
}

export const UserMessageBox: React.FC<UserMessageBoxProps> = ({ appearance, message, timestamp }) => {


    const iso: string = timestamp?.ist === undefined ? '' : timestamp.ist;
    const userMessage = <div className="message text-bg appeared">
        <div className="text_wrapper">
            <p className="text-[#0A3E54] px-[20px] py-[10px] text-[14px]">{typeof message === "string" ? message : ''}</p>
        </div>
    </div>;      

    const formattedResponse = () => {
        
        return <div className="text-[#5D5C5C] pl-[10px] py-[10px] pb-[10px] text-[14px]" dangerouslySetInnerHTML={{ __html: message }} />
    }

    const botMessage = () => {
        return (<div className="message appeared">
            <div className="flex">
                <Image src={BotIcon} alt="sre_icon" height={48} width={48} />
                <div className="text_wrapper ml-[5px]">
                    <div>{formattedResponse()}</div>
                </div>
            </div>
        </div>)
    };

    return (<>
        {appearance === 'right' && <div className="text-[10px] text-[#ABABAB] text-right">{iso}</div>}
        <div className={` ${appearance}`}>
            {appearance === 'right' ? userMessage : botMessage()}
        </div>
    </>
    );
}
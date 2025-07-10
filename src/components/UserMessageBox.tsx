"use client";
import Image from 'next/image';
import BotIcon from '../img/aI_blue_icon.svg';
import { useState } from 'react';
import * as utils from '../utils/utils';

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

interface CheckResults {
    status_check_results: Services | undefined;
    diagnostic_insights?: Result;
    remediation_actions?: Result;
    reasoning?: string;
    recommendation?: string;
}

interface Services {
    services: Result | null | undefined;
}

interface Result {
    [key: string]: string;
}

interface Response {
    agent_message?: CheckResults;
    message_time?: string;
    is_approval_required?: boolean;
    ref_num?: string;
}

export const UserMessageBox: React.FC<UserMessageBoxProps> = ({ appearance, message, timestamp, applyFix }) => {

    const [isApproved, setIsApproved] = useState(false);
    const [isRespond, setIsRespond] = useState(false);

    const iso: string = timestamp?.ist === undefined ? '' : timestamp.ist;
    const userMessage = <div className="message text-bg appeared">
        <div className="text_wrapper">
            <p className="text-[#0A3E54] px-[20px] py-[10px] text-[14px]">{typeof message === "string" ? message : ''}</p>
        </div>
    </div>;

    const loadStatusTable = (status: object | undefined | null, title: string, header: boolean) => {
        if (status !== null && status !== undefined) {
            if (typeof status === "object") {
                return (
                    <div>
                        <div className='text-[14px] text-[#5D5C5C] font-semibold mt-[15px]'>{title}</div>
                        <table className="border-collapse min-w-[30%] max-w-[70%] rounded-lg mt-[5px]">
                            <tbody>
                                {header && <tr className="odd:bg-[#F0FFFA] even:bg-white border border-[#DFEFEA]">
                                    <td className="p-[10px] whitespace-nowrap text-[14px] text-[#5D5C5C] font-medium">Service</td>
                                    <td className="p-[10px] whitespace-nowrap text-[14px] text-[#5D5C5C] font-medium">Status</td>
                                </tr>}
                                {Object?.entries(status).map(([key, value]) => (value !== null && value !== "") ?
                                    <tr key={key} className="odd:bg-[#F0FFFA] even:bg-white border border-[#DFEFEA]">
                                        <td className="p-[10px] text-[14px] text-[#5D5C5C] capitalize text-wrap">{key.replace(/_|-/g, " ")}</td>
                                        <td className="p-[10px] text-[14px] text-[#5D5C5C] text-wrap">{value}</td>
                                    </tr> : '')}
                            </tbody>
                        </table>
                    </div>)
            } else if(status!==""){
                return (
                <div>
                    <div className='text-[14px] text-[#5D5C5C] font-semibold mt-[15px]'>{title}</div>
                    <div className='text-[14px] text-[14px] text-[#5D5C5C]'>{status}</div>
                </div>)
            }
        }
    }

    const onSubmit = (isApply: boolean) => {
        setIsApproved(isApply);
        setIsRespond(true);
        applyFix(isApply);
    }

    const formattedResponse = () => {
        let msg: Response = {};
        if (typeof message === 'object') {
            msg = message;
            const reson = msg?.agent_message?.reasoning;
            const rec = msg?.agent_message?.recommendation;
            const checkResults = msg.agent_message === undefined || msg.agent_message === null ? undefined : msg?.agent_message.status_check_results
            const services = checkResults?.services === undefined || checkResults.services === null ? checkResults : checkResults.services;
            const status = loadStatusTable(services, "Service Health Status", true);
            const insights = loadStatusTable(msg?.agent_message?.diagnostic_insights, "Diagnostic Insights", false);
            const remediation = loadStatusTable(msg?.agent_message?.remediation_actions, "Remediation Actions", false);
            const is_approval_required = msg?.is_approval_required;

            return (<div className='pl-[10px] py-[10px] pb-[10px]'>
                <div>{status}</div>
                <div className='mt-[10px]'>{insights}</div>
                <div className='mt-[10px]'>{remediation}</div>
                <div className='text-[14px] text-[#5D5C5C] font-semibold mt-[10px]'>Reasoning</div>
                <div className='text-[14px] text-[14px] text-[#5D5C5C]'>{reson}</div>
                <div className='text-[14px] text-[#5D5C5C] font-semibold mt-[10px]'>Recommendation</div>
                <div className='text-[14px] text-[#5D5C5C]'>{rec}</div>
                {is_approval_required && <div className='mt-[20px]'>
                    {isRespond ? <div className={isApproved ? 'inline-block text-[14px] text-[#187E3F] bg-[#EEFFF5] px-[10px] py-[5px] rounded-[5px]' : 'inline-block text-[14px] text-[#ff5d5d] bg-[#ffdede] px-[10px] py-[5px] rounded-[5px]'}> {isApproved ? 'Approved' : 'Rejected'}</div> : <div><div className='text-[13px] text-[#8F8F8F] font-semibold'>{utils.APPROVE_REJECT}</div> <div className='flex mt-5'>
                        <button className="bg-[#29707A] hover:bg-[#29707A] focus:outline-2 focus:outline-offset-2 focus:outline-[#29707A] active:bg-[#29707A] py-[5px] px-[10px] text-white text-[14px] rounded-[5px]" onClick={() => onSubmit(true)}>
                            Approve
                        </button>
                        <button className="border border-[#6D6D6D] hover:bg-[#6D6D6D] focus:outline-2 focus:outline-offset-2 focus:outline-[#6D6D6D] active:bg-[#6D6D6D] ml-[30px] py-[5px] px-[10px] hover:text-white text-[14px] rounded-[5px]" onClick={() => onSubmit(false)}>
                            Reject
                        </button>
                    </div>
                    </div>}
                </div>}
            </div>);
        }

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
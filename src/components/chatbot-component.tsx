"use client"
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
//import Image from 'next/image';
//import EndTask from '../img/Icon-End-task.svg';
//import EndTaskWhite from '../img/Icon-End-task-white.svg';
import * as utils from "../utils/utils";
import { MessagesContainer } from '@/components/MessagesContainer';
import { SendButton } from '@/components/send-button';
import { MessageTextBoxContainer } from '@/components/MessageTextBoxContainer';
import AxiosInstance from '../utils/axiosInstance';
//import { Loader } from './loader';
import CustomDialog from './custom-dialog';
//import { Loader } from './loader';

interface BotReq {
    params: Data;
}

interface Data {
    ref_num: string;
    IncidentNo?: string;
}

interface MessageFormat {
    message?: string | Response;
    isbotmessage?: boolean;
    ts?: string;
}

interface Response {
    agent_message?: object | null
    diagnostic_insights?: object | null
    remediation_actions?: object | null
    reasoning?: string | null
    recommendation?: string | null
    is_approval_required?: boolean
    message_time?: string | null
}

type Props = {
  history: () => void;
};

function ChatBotComponent({history}: Props) {
    const router = useRouter();
    const [current_message, setCurrent_message] = useState("");
    const temp: MessageFormat = utils.getWelcomeMsg();
    const [messages, setMessage] = useState([temp]);
    const [isResponse, setIsResponse] = useState(false);
    //const [isHovering, setIsHovered] = useState(false);
    //const [isLoading, setIsLoading] = useState(false);
   // const [isSummaryClicked, setIsSummaryClicked] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    //const onMouseEnter = () => setIsHovered(true);
    //const onMouseLeave = () => setIsHovered(false);
    //const [refNumber, setRefNumber] = useState('');
    const userName = localStorage.getItem('userName');
    const userId: string = userName !== null ? userName : '';
    const botResTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isIncidentNoValid, setIsIncidentNoValid] = useState(false);

    useEffect(() => {
        //setIsPageLoading(true);
        if (localStorage.getItem('isAuthenticated') !== "yes") {
            router.push('/login');
        }
        return () => {
            if (botResTimeoutRef.current) {
                clearTimeout(botResTimeoutRef.current);
            }           
        };


    }, []);

    const getBotResponse = async (refNo: string, msg: []) => {
        try {
            const reqPath = utils.CHAT + "/" + userId + "/" + utils.CONVERSATIONS;
            const req: BotReq = { params: { "ref_num": refNo } }
            const response = await AxiosInstance.get(reqPath, req);
            if (response.status === 200) {
                const data = response?.data === undefined ? {} : response?.data?.data;
                const allMsg = [...msg, { "message": data, "isbotmessage": true }];
                setMessage(allMsg);
                setIsResponse(false);
                //setRefNumber(refNo);
                botResclearTimer();
                history();
            } else if (response.status === 202) {
                if (botResTimeoutRef.current) {
                    setTimeout(() => {
                        getBotResponse(refNo, msg)
                    }, 10000);
                }
            }
        } catch (error) {
            botErrorMessage(error, msg);
            botResclearTimer();
        }
    }

    const botResclearTimer = () => {
        if (botResTimeoutRef.current) {
            clearTimeout(botResTimeoutRef.current);
        }
    }

    // @ts-expect-error
    const sendConversations = async (req, msg) => {
        try {
            const reqPath = utils.CHAT + "/" + userId + "/" + utils.CONVERSATIONS;
            const response = await AxiosInstance.post(reqPath, req);
            const refNo = response?.data.ref_num === undefined ? {} : response?.data.ref_num;
            if (response.status === 200) {
                botResTimeoutRef.current = setTimeout(() => {
                    getBotResponse(refNo, msg)
                }, 5000);
            } else if (response.status === 202) {
                const data = response?.data === undefined ? {} : response?.data;
                const res_message = data?.message === undefined ? {} : data?.message;
                const allMsg = [...msg, { "message": res_message, "isbotmessage": true }];
                setMessage(allMsg);
                setIsResponse(false);
            }
        } catch (error) {
            botErrorMessage(error, msg)
        }
    }

    const botErrorMessage = (error: unknown, msg: []) => {
        const oldMsg = msg.length === 0 ? [...messages] : [...msg];
        const allMsg = [...oldMsg, { "message": utils.BOT_ERROR, "isbotmessage": true }];
        setMessage(allMsg);
        setIsResponse(false);
        console.log(error);
    }

    const handleClick = () => {
        if (messages.length == 1 && current_message.length < 8) {
            setIsMessage(true);
            setTitle(utils.INVALID_INCIDENT_NO);
            setMsg(utils.INVALID_INCIDENT_NO_MSG);
            setIsIncidentNoValid(true);
            setCurrent_message('');
        } else {
            setIsResponse(true);
            addMessageBox(true);
        }
    }

    // @ts-expect-error
    const onChange = (e) => {
        const vl = e.target.value;
        // if (messages.length === 1) {
        //     vl = vl !== undefined ? vl.replace(/[^a-zA-Z0-9]/g, "") : '';
        // }
        setCurrent_message(vl);
    }

    const addMessageBox = (enter = true) => {
        let msg = messages;
        const current_msg = current_message;
        if (current_msg !== "" && enter) {
            const ts = utils.getCurrentTimestamp();
            const req = utils.conversation_req;
            req.content = current_msg;
            req.entry_ts = ts.utc;
            // @ts-expect-error
            msg = [...messages, { "message": current_msg, "ts": ts },];
            setCurrent_message(current_msg);
            setMessage(msg);
            setCurrent_message("");
            sendConversations(req, msg);
        } else {
            setIsResponse(false);
        }
    }

    const _handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        let enter_pressed = false;
        if (e.key === "Enter") {
            enter_pressed = true;
            setIsResponse(true);
            addMessageBox(enter_pressed);
        }
    }

    // const endTaskClick = async () => {
    //     try {
    //         const req = {};
    //         // @ts-expect-error     
    //         req['app_name'] = appId;
    //         // @ts-expect-error
    //         req['user_id'] = userId;
    //         const reqPath = "/" + utils.ALL_TICKETS + "/" + utils.SUMMARY;
    //         setIsLoading(true);
    //         const response = await AxiosInstance.post(reqPath, req);
    //         if (response.status === 200) {
    //             setIsLoading(false);
    //             setIsMessage(true);
    //             setTitle('End Chat');
    //             setMsg('Your chat was closed, If you want start again please click new task');
    //             botResclearTimer();
    //             botApplyResClearTimer();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setIsLoading(false);
    //         setIsMessage(true);
    //         setTitle('End Chat');
    //         setMsg("I'm unable to close your chat.");
    //         botResclearTimer();
    //         botApplyResClearTimer();
    //     }
    // }

    const endTaskOK = () => {
        if (isIncidentNoValid) {
            setIsMessage(false);
            setIsIncidentNoValid(false);
        } else {
            reset();
            setIsMessage(false);
            setMsg('');
            botResclearTimer();
        }
    }

    const reset = () => {
        setMessage([utils.getWelcomeMsg()])
        setIsResponse(false);
        setCurrent_message('');
       // setIsSummaryClicked(false);
        botResclearTimer();
    }

    // const applyFix = async (isApply: boolean) => {
    //     try {
    //         const reqPath = "/" + utils.ALL_TICKETS + "/" + utils.APPLY_FIX;
    //         const req = utils.apply_fix_req;
    //         const ts = utils.getCurrentTimestamp();
    //         req.app_name = 'O11y';
    //         req.ref_num = refNumber;
    //         req.is_approved = isApply;
    //         req.user_id = userId;
    //         req.entry_ts = ts.utc;
    //         setIsResponse(true);
    //         const response = await AxiosInstance.post(reqPath, req);
    //         const refNo = response?.data.ref_num === undefined ? {} : response?.data.ref_num;
    //         if (response.status === 200) {
    //             if (isApply && refNo) {
    //                 botApplyResTimeoutRef.current = setTimeout(() => {
    //                     getApplyFixRes(refNo)
    //                 }, 20000);
    //             } else {
    //                 setIsResponse(false);
    //             }
    //         }
    //     } catch (error) {
    //         botErrorMessage(error, []);
    //     }
    // }

    // const getApplyFixRes = async (refNo: string) => {
    //     try {
    //         const reqPath = "/" + utils.ALL_TICKETS + "/" +  utils.APPLY_FIX;
    //         const req: BotReq = { params: { "ref_num": refNo } }
    //         const response = await AxiosInstance.get(reqPath, req);
    //         if (response.status === 200) {
    //             const data = response?.data === undefined ? {} : response?.data;
    //             const allMsg = [...messages, { "message": data, "isbotmessage": true }];
    //             setMessage(allMsg);
    //             setIsResponse(false);
    //             setRefNumber(refNo);
    //             botApplyResClearTimer();
    //         } else if (response.status === 202) {
    //             if (botApplyResTimeoutRef.current)
    //                 setTimeout(() => {
    //                     getApplyFixRes(refNo)
    //                 }, 10000);
    //         }
    //     } catch (error) {
    //         botErrorMessage(error, []);
    //         botApplyResClearTimer();
    //     }
    // }

    return (
        <div className='flex dialog'>
            <div className='w-full h-full'>
                <div className='relative h-full'>
                    <div className='h-full'>
                        {/* @ts-expect-error: Unreachable code error */}
                        <MessagesContainer messages={messages} isResponse={isResponse}></MessagesContainer>
                        <div className='bottom_wrapper'>
                            {/* {(messages.length > 5 || isSummaryClicked) && <div className='right'>
                                <div className="relative group">
                                    <div className='px-[20px] py-[5px] flex justify-center border border-[#FF9688] mb-[5px] hover:bg-[#FF9688] cursor-pointer ed-tk'
                                        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={endTaskClick}>
                                        <Image src={isHovering ? EndTaskWhite : EndTask} height={14} alt="end" />
                                        <div className='ml-[10px] text-[12px] text-[#FF9688] ed-txt'>End Task</div>
                                    </div>
                                    <div className="absolute bottom-full transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm border border-[#FDB7AE] text-[#FDB7AE] text-[12px] bg-white rounded shadow-lg opacity-0 group-hover:opacity-100">
                                        Resolution helpful? End task if satisfied.
                                    </div>
                                </div>
                            </div>} */}
                            <div className='btm_border'>
                                <div className="clearfix flex w-full">
                                    <MessageTextBoxContainer
                                        _handleKeyPress={(e) => _handleKeyPress(e)}
                                        onChangeInput={(e) => onChange(e)}
                                        message={current_message} disable={isResponse}></MessageTextBoxContainer>
                                    <SendButton handleClick={handleClick} disable={isResponse}></SendButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {isLoading && <Loader />} */}
            {isMessage && <CustomDialog isOpen={isMessage} title={title} message={msg} onModelClose={() => endTaskOK()} />}
        </div>
    );
}

export default ChatBotComponent;
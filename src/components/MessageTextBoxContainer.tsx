"use client";

import { ChangeEventHandler, KeyboardEventHandler} from "react";

interface MessageTextBoxContainerProps {
    message: string;
    onChangeInput: ChangeEventHandler<HTMLInputElement>;
    _handleKeyPress: KeyboardEventHandler<HTMLInputElement>;
    disable: boolean;
}

export const MessageTextBoxContainer: React.FC<MessageTextBoxContainerProps> = ({ message, onChangeInput, _handleKeyPress, disable }) => {
    
    return (
        <div className="message_input_wrapper"> 
            <input id="msg_input" className="message_input text-[14px] text-[#3D3C3C]" placeholder="Type your messages here..." value={message} onChange={(e) => onChangeInput(e)} onKeyDown={(e) => _handleKeyPress(e)} disabled={disable} />              
        </div>
    );
}

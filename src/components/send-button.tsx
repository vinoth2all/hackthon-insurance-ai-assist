
"use client";

import SendIcon from '../img/Chat-enter.svg';
//import SendIconHover from '../img/Chat-enter-hover.svg';
import Image from 'next/image';

interface SendButtonProps {
    handleClick?: () => void;
    disable: boolean;
}

export const SendButton: React.FC<SendButtonProps> =({ handleClick, disable}) => {
    // return (<div className="send_message cursor-pointer bg-[#7EC4E9]" onClick={handleClick}>
    //     <div className="text">send</div>
    // </div>);

    return ( <div className="image-container cursor-pointer" onClick={disable? undefined: handleClick}>
        <Image src={SendIcon} alt="Default" height={42} style={{ position: 'relative' }} />
        {!disable && <Image src={SendIcon} alt="Hover" height={42} style={{ position: 'absolute' }}/>}
    </div>)

}
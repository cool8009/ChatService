import { useEffect, useRef } from 'react';

//comp that desplay the message
const MessageContainer = ({ messages }) => {
    const messageRef = useRef();

    //to scroll when there are new messages
    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return <div ref={messageRef} className='message-container' >
        {messages.map((m, index) =>
            <div key={index} className='user-message'>
                <div className='message bg-primary'>{m.message}</div>
                <div className='from-user'>{m.user}</div>
            </div>
        )}
    </div>
}

export default MessageContainer;
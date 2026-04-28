
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const chat = (query)=>{
        // AXIOS GET on the POKECHAT API POINT 
        if (!query?.trim()) return;
        setLoading(true);
        axios.get(`${CHAT_API}/chat/query`, { params: { q: query } })
            .then(res => {
                setSearchResults(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleSend = () => {
        const query = inputRef.current?.inputRef?.current?.value;
        chat(query);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
    <div className='chat'>
        <Input 
        fluid 
        loading={loading}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        icon={<Icon name='send' inverted circular link />}
        placeholder='Ask me a Pokemon Question...'
        />
        <Label pointing='above' message="strongest pokemon limit 1"
        onClick={() => chat('strongest pokemon limit 1')} style ={{ cursor: 'pointer' }}> 
        Strongest Pokemon 
        </Label>
        <Label pointing='above' message="weakest pokemon limit 1"
        onClick={() => chat('weakest pokemon limit 1')} style ={{ cursor: 'pointer' }}>
        Weakest Pokemon 
        </Label>
        <Label pointing='above' message="starter pokemon limit 3"
        onClick={() => chat('starter pokemon limit 3')} style ={{ cursor: 'pointer' }}>  
        Starter Pokemon
        </Label>
    </div>
    );
}

export {ChatForm};

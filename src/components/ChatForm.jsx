
import React, { useEffect, useRef, useState } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const chat = (q)=>{
        // AXIOS GET on the POKECHAT API POINT 
        if (!q?.trim()) return;
        setLoading(true);
        axios.get(`${CHAT_API}/chat/query`, { params: { q: q } })
            .then(res => {
                console.log('Response:', res.data);
                setSearchResults(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleSend = () => {
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        icon={<Icon name='send' inverted circular link onClick={handleSend} />}
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

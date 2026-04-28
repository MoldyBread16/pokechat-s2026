import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';

const TYPE_COLORS = {
grass: '#6af573', water: '#4bc6ff', fire: '#ff7a7a',
electric: '#fde779', psychic: '#d18bff', bug: '#bcff88',
dragon: '#fde67e', flying: '#8db5ff', dark: '#C3C0BB', 
poison: '#bf74fd', ground: '#e6ca7e', fighting: '#ffae67', 
ice: '#5bdbff', ghost: '#a575ff', fairy: '#f098ff',
normal: '#F5F5F5', steel: '#D8D8D8', rock: '#D5D5D4',
};

const SPRITES = ['front_default', 'back_default', 'front_shiny', 'back_shiny'];

const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    const [spriteIndex, setSpriteIndex] = useState(0);
    useEffect(() => {
        //AXIOS GET ON THE POKEAPI PT
        setData(null);
        setSpriteIndex(0);
        axios.get(`${POKE_API}/pokemon/${pokemonID}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err)); 
    }, [pokemonID]);

    if (!data) return <Card><Card.Content>Catching Pokemon...</Card.Content></Card>

    const primaryType = data.types[0]?.type.name;
    const cardColor = TYPE_COLORS[primaryType] || '#F5F5F5';
    const availableSprites = SPRITES.map(key => data.sprites[key]).filter(Boolean);
    
    return (
        <Card style={{ backgroundColor: cardColor }}>
            <Image
                src={availableSprites[spriteIndex]}
                style={{ imageRendering: 'pixelated', cursor: 'pointer', background:'rgba(255,255,255,0.5)' }}
                onClick={() => setSpriteIndex(i => (i + 1) % availableSprites.length)}
            />

            <Card.Content>
                <Card.Header style={{ textTransform: 'capitalize' }}>{data.name}</Card.Header>
                <Card.Meta>
                    {data.types.map(t => (
                        <Label key={t.type.name} style={{ backgroundColor: TYPE_COLORS[t.type.name] || '#eee', textTransform: 'capitalize' }}>
                            {t.type.name}
                        </Label>
                    ))}
                </Card.Meta>
            </Card.Content>

            <Card.Content>
                <List size='large'>
                    {data.stats.map(s => (
                        <ListItem key={s.stat.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textTransform: 'capitalize' }}>{s.stat.name}</span>
                            <strong>{s.base_stat}</strong>
                        </ListItem>
                    ))}
                </List>
            </Card.Content>

        </Card>
    );
}

export {PokemonCard};
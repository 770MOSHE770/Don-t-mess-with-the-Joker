type CardState = 'none' | 'green' | 'red';
type gameState = 'waiting';


export interface Card {
  state: CardState; 
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  hesTurn: boolean;
}

export interface Game {
    id: string;
    roomName: string;
    hownerId: string;
  players: Player[];
  deck: Card[];
  round: number;
  state: gameState; 
}
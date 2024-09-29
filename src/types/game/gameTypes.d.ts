type CardState = 'none' | 'green' | 'red';
type gameState = 'waiting';


export interface Card {
  state: CardState; 
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
}

export interface Game {
    id: string;
    hownerId: string;
  players: Player[];
  deck: Card[];
  round: number;
  state: gameState; 
  userTurnId: string;
}
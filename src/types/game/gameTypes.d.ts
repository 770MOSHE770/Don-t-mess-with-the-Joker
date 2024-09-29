type CardState = 'none' | 'green' | 'red';
type PlayerState = 'green' | 'red';
type GameState = 'waiting' | 'starting';


export interface Card {
  state: CardState;
}

export interface Player {
  id: string;
  name: string;
  playerState: PlayerState
  hand: Card[];
}

export interface Game {
  id: string;
  hownerId: string;
  players: Player[];
  deck: Card[];
  round: number;
  state: GameState;
  userTurnId: string;
  numOfRedPlayers: number;
  numOfRedCards: number;
}
import { v4 } from 'uuid';
import { Game, Player, Card } from '../types/game/gameTypes';

const games: Record<string, Game> = {};

function generateUniqueGameId(): string {
    let gameId: string;
    do {
        gameId = v4().slice(0, 6)

    } while (games[gameId]);

    return gameId;
}

function getHandCardDefaule(): Card[] {
    return [
        { state: 'none' },
        { state: 'none' },
        { state: 'none' },
        { state: 'none' },
        { state: 'none' },
    ];
}

function updatePlayersState(game: Game) {
    const playersAmount = game.players.length
    for (let index = 0; index < game.numOfRedPlayers; index++) {
        const redPlayerIIndex = Math.floor(Math.random() * playersAmount)
        game.players[redPlayerIIndex].playerState = 'red'
    }
}

function updatePlayersCards(game: Game) {
    const cardsGame: Card[] = []
    const playersAmount = game.players.length
    let randomPlayerIndex
    let positionCardIndex

    for (let index = 0; index < playersAmount; index++) {
        do {
            randomPlayerIndex = Math.floor(Math.random() * playersAmount)
            positionCardIndex = Math.floor(Math.random() * game.round)
        } while (game.players[randomPlayerIndex].hand[positionCardIndex].state != 'none');
        game.players[randomPlayerIndex].hand[positionCardIndex].state = 'green'
    }

    for (let index = 0; index < game.numOfRedCards; index++) {
        do {
            randomPlayerIndex = Math.floor(Math.random() * playersAmount)
            positionCardIndex = Math.floor(Math.random() * game.round)
        } while (game.players[randomPlayerIndex].hand[positionCardIndex].state != 'none');
        game.players[randomPlayerIndex].hand[positionCardIndex].state = 'red'
    }
}

export function createNewGame(
    username: string,
    hownerId: string,
): string {
    const id = generateUniqueGameId()

    const player: Player = {
        id: hownerId,
        name: username,
        hand: getHandCardDefaule(),
        playerState: 'green'
    }

    const game: Game = {
        id,
        hownerId,
        players: [player],
        deck: [],
        round: 5,
        state: "waiting",
        userTurnId: "",
        numOfRedPlayers: 1,
        numOfRedCards: 1
    }
    games[id] = game
    return game.id;
}

export function joinToGame(
    username: string,
    userId: string,
    gameId: string,
): string {
    const game = games[gameId]
    if (!game) {
        throw ("No existing game")
    }

    const player: Player = {
        id: userId,
        name: username,
        hand: getHandCardDefaule(),
        playerState: 'green'
    }

    game.players.push(player)
    return game.id;
}


export function startGame(
    userId: string,
    gameId: string,
    numOfRedPlayers?: number,
    numOfRedCards?: number
): Game {
    const game = games[gameId]
    if (!game) {
        throw ("No existing game")
    }

    if (game.hownerId != userId) {
        throw ("No howner")
    }

    if (game.state != 'waiting') {
        throw ("No waiting game")
    }

    if (numOfRedPlayers) {
        game.numOfRedPlayers = numOfRedPlayers
    }

    if (numOfRedCards) {
        game.numOfRedPlayers = numOfRedCards
    }


    updatePlayersState(game)
    updatePlayersCards(game)



    game.state = 'starting'

    return game;
}
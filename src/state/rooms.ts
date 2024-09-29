import { v4 } from 'uuid';
import { Game, Player } from '../types/game/gameTypes';

const rooms: Record<string, Game> = {};

function generateUniqueRoomId(): string {
    let roomId: string;
    do {
        roomId = v4().slice(0, 6)

    } while (rooms[roomId]);

    return roomId;
}

export function createNewRoom(username: string, hownerId: string): string {
    const id = generateUniqueRoomId()

    const player: Player = {
        id: hownerId,
         name: username,
        hand: []
    }

    const room: Game = {
        id,
        hownerId,
        players: [player],
        deck: [],
        round: 0,
        state: "waiting",
        userTurnId: ""
    }
    rooms[id] = room
    return room.id;
}

export function joinToRoom(username: string, userId: string, roomId: string): string {
    const room = rooms[roomId]
    if (!room) {
        throw ("No existing room")
    }

    const player: Player = {
        id: userId,
        name: username,
        hand: []
    }

    room.players.push(player)
    return room.id;
}
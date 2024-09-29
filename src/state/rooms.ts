import { v4 } from 'uuid';
import { Game } from '../types/game/gameTypes';

const rooms: Record<string, Game> = {};

function generateUniqueRoomId(): string {
    let roomId: string;
    do {
        roomId = v4().slice(0, 6)

    } while (rooms[roomId]);

    return roomId;
}

export function createNewRoom(roomName: string, hownerId: string): Game {
    const id = generateUniqueRoomId()
    const room: Game = {
        id,
        roomName,
        hownerId,
        players: [],
        deck: [],
        round: 0,
        state: "waiting"
    }
    rooms[id] = room
    return room;
}
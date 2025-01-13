import { RegisteredPlayer } from "../registeredPlayer";


export interface RegistrationRequest{
    tournamentId: number;
    registeredPlayerList: RegisteredPlayer[];
}
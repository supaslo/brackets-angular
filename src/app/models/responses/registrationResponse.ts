import { RegisteredPlayer } from "../registeredPlayer";
import { Tournament } from "./tournament";

export interface RegistrationResponse{

    tournament: Tournament;
    playerCount: number;
    everybodyPaid: boolean;
    registeredPlayerList: RegisteredPlayer[];
    
}
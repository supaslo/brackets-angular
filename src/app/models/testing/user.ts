import { Profile } from './profile';
import { Technology } from './technology';

export class User { 
    userName: string = "";
	profile: Profile = {
        prId: "",
        prName: "",
    };
	technologies: Technology[] = [];
} 
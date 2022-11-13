declare namespace Express {
    export type Role = 'admin' | 'standard';

    export interface UserSession {
        id: string;
        role: Role;
    };

    export interface Request  {
        userSession?: UserSession;
    };
};
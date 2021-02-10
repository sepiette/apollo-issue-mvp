
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserInput {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export class UserType {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export abstract class IQuery {
    abstract getUser(id: number): UserType | Promise<UserType>;
}

export abstract class IMutation {
    abstract createUser(input?: UserInput): UserType[] | Promise<UserType[]>;
}

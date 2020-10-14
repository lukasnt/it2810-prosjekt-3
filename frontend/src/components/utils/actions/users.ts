import { User } from "../reducers/user";

//Funksjoner som returnerer action-objekter
export function setUser(user : User) {
    return {
        type: "SET_USER",
        payload: user
    } as const;
}

export function removeUser() {
    return {
        type: "REMOVE_USER"
    } as const;
}
export type UserActions = ReturnType<typeof setUser> | ReturnType<typeof removeUser>;

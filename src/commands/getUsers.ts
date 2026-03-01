import { read } from "node:fs";
import { getUsers } from "../migrations/queries/users";
import { readConfig } from "../core/config";



export async function handlerGetAllUsers(cmdName: string, ...args: string[]): Promise<void> {
    const allUsers = await getUsers();

    const config = readConfig();
    const currentUser = config.currentUserName;

    allUsers.forEach(user => {
        if (user.name === currentUser)
            console.log(`* ${user.name} (current)`);
        else
            console.log(`* ${user.name}`);
    });
}

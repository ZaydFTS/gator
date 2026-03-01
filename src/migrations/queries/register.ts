import { createUser, getUserByName } from "./users";
import { setUser } from "../../core/config";
import type { CommandHandler } from "../../commands/commandHandler";
import { db } from "..";
import { users } from "../../core/schema";



export const handlerRegister: CommandHandler = async (cmdName, ...args) => {
    if (args.length === 0) {
        throw new Error("username is required");
    }
    const userName = args[0];

    const existingUser = await getUserByName(userName);

    if (existingUser) {
        throw new Error(`User '${userName}' already exists`);
    }
    const newUser = await createUser(userName);
    setUser(userName);
    console.log(`User created: ${userName}`);
    console.log("User data:", newUser);
}

export const handlerTruncate: CommandHandler = async (cmdName, ...args) => {
    await db.delete(users).execute();
    console.log("Users table truncated");
};

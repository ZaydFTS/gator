import { getUserByName } from "../migrations/queries/users";
import { setUser } from "../core/config";
import { get } from "node:http";
import { User } from "../core/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;


export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        throw new Error("username is required");
    }


    const userName = args[0];

    const user = await getUserByName(userName);
    if (!user) {
        throw new Error(`User '${userName}' does not exist`);
    }
    setUser(userName);
    console.log(`User set to ${userName}`);
}

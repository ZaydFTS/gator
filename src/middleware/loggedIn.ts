import { readConfig } from "../core/config";
import { getUserByName } from "../migrations/queries/users";
import { UserCommandHandler, CommandHandler } from "../commands/commandHandler";

export function middlewareLoggedIn(
    handler: UserCommandHandler
): CommandHandler {
    return async (cmdName: string, ...args: string[]): Promise<void> => {
        const config = readConfig();
        if (!config.currentUserName)
            throw new Error("No user logged in");
        const user = await getUserByName(config.currentUserName);
        if (!user)
            throw new Error(`User ${config.currentUserName} not found`)
        return handler(cmdName, user, ...args);
    }
}

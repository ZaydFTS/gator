import { CommandHandler } from "./commandHnadler";

export type CommandsRegistry = {
    [commandName: string]: CommandHandler;
};

export function registerCommand(
    registry: CommandsRegistry,
    cmdName: string,
    handler: CommandHandler
): void {
    registry[cmdName] = handler;
}

export async function runCommand(
    registry: CommandsRegistry,
    cmdName: string,
    ...args: string[]
): Promise<void> {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Unkown command: ${cmdName}`);
    }
    await handler(cmdName, ...args);
}

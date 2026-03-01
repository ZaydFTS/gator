import { getUserByName } from "./users";
import { setUser } from "../../config";
import type { CommandHandler } from "../../commandHnadler";

export const handlerLogin: CommandHandler = async (cmdName, ...args) => {
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
};
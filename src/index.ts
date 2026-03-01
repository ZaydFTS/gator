import { handlerAddFeed } from "./commandAddFeed";
import { handlerAgg } from "./commandAggHandler";
import { handlerFollowing } from "./commandFollowing";
import { handlerFollow } from "./commandFollow";
import { handlerGetAllUsers } from "./commandGetAllUsers";
import { handlerFeeds } from "./commandGetFeedHandler";
import { handlerLogin } from "./commandHnadler";
import {
    CommandsRegistry,
    registerCommand,
    runCommand,
} from "./commandRegistry";
import { handlerRegister, handlerTruncate } from "./migrations/queries/register";
import { middlewareLoggedIn } from "./middlewareLoggedIn";
import { handlerUnfollow } from "./commandUnfollow";

async function main() {

    const registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handlerTruncate);
    registerCommand(registry, "users", handlerGetAllUsers)
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(registry, "feeds", handlerFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
    registerCommand(
        registry,
        "unfollow",
        middlewareLoggedIn(handlerUnfollow)
    )

    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.error("Error: not enough arguments provided");
        process.exit(1);
    }
    const cmdName = args[0];
    const cmdArgs = args.slice(1);

    try {
        await runCommand(registry, cmdName, ...cmdArgs);
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        } else {
            console.error("An unknown error occurred");
        }
        process.exit(1);
    }
    process.exit(0);
}

main();
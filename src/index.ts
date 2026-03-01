import { handlerAddFeed } from "./commands/addFeed";
import { handlerAgg } from "./commands/agg";
import { handlerFollowing } from "./commands/following";
import { handlerFollow } from "./commands/follow";
import { handlerGetAllUsers } from "./commands/getUsers";
import { handlerFeeds } from "./commands/getFeeds";
import { handlerLogin } from "./commands/commandHandler";
import {
    CommandsRegistry,
    registerCommand,
    runCommand,
} from "./commands/registry";
import { handlerRegister, handlerTruncate } from "./migrations/queries/register";
import { middlewareLoggedIn } from "./middleware/loggedIn";
import { handlerUnfollow } from "./commands/unfollow";
import { handlerBrowse } from "./commands/browse";

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
    );
    registerCommand(
        registry,
        "browse",
        middlewareLoggedIn(handlerBrowse)
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
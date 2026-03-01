import { createFeed } from "../migrations/queries/feed";
import { printFeed } from "../migrations/queries/printFeed";
import { createFeedFollow } from "../migrations/queries/feedFollows";
import { User } from "../core/schema";

export async function handlerAddFeed(
    cmdName: string,
    user: User,
    ...args: string[]
): Promise<void> {

    if (args.length < 2) {
        throw new Error("Usage: addfeed <name> <url>");
    }

    const [name, url] = args;

    const feed = await createFeed(name, url, user.id);
    const follow = await createFeedFollow(user.id, feed.id);
    printFeed(feed, user, follow);
}

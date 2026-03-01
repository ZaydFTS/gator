import { getFeedByUrl } from "./migrations/queries/feed";
import { createFeedFollow } from "./migrations/queries/feedFollows";
import { User } from "./schema";

export async function handlerFollow(
    cmdName: string,
    user: User,
    ...args: string[]
): Promise<void> {
    if (args.length < 1) {
        throw new Error("Usage: follow <url>");
    }
    const [url] = args;

    const feed = await getFeedByUrl(url);
    if (!feed) throw new Error("Feed not found");
    
    const follow = await createFeedFollow(user.id, feed.id);
    console.log(`* ${follow.userName} is now following ${follow.feedName}`);
}
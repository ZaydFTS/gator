import { deleteFeedFollowByUrl } from "../migrations/queries/feedFollows";
import { User } from "../core/schema";


export async function handlerUnfollow(
    cmdName: string,
    user: User,
    ...args: string[]
): Promise<void> {
    if (args.length < 1)
        throw new Error("Usage: unfollow <url>");

    const [url] = args;
    const feedName = await deleteFeedFollowByUrl(user.id, url);
    console.log(`* ${user.name} unfollowed ${feedName}`);
}

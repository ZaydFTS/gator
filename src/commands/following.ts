import { getFeedFollowsForUser } from "../migrations/queries/feedFollows";
import { User } from "../core/schema";

export async function handlerFollowing(
    cmdName: string,
    user: User,
    ...args: string[]
): Promise<void> {
    const follows = await getFeedFollowsForUser(user.id);
    follows.forEach(follow => {
        console.log(`* ${follow.feedName}`);
    });
}

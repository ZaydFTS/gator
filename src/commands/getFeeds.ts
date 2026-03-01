import { getFeedWithUser } from "../migrations/queries/feed";


export async function handlerFeeds(
    cmdName: string,
    ...args: string[]
): Promise<void> {
    if (args.length > 0) {
        throw new Error("Usage: feeds");
    }
    const feeds = await getFeedWithUser();
    feeds.forEach((feed: { feedName: any; feedUrl: any; userName: any; }) => {
        console.log(`* ${feed.feedName}`);
        console.log(`  URL: ${feed.feedUrl}`);
        console.log(`  User: ${feed.userName}`);
    });
}

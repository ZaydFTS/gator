import { getNextFeedToFetch, markFeedFetched } from "./migrations/queries/feed";
import { fetchFeed } from "./RSS/fetchFeed";
import { createPost } from "./migrations/queries/posts";

export async function scrapeFeeds() {
    const feed = await getNextFeedToFetch();

    if (!feed) {
        console.log("No feeds found.");
        return;
    }

    console.log(`Fetching: ${feed.name}`);

    await markFeedFetched(feed.id);

    const rss = await fetchFeed(feed.url);

    for (const item of rss.items) {
        const publishedAt = parsePublishedDate(item.pubDate);

        await createPost({
            title: item.title,
            url: item.link,
            description: item.description,
            publishedAt,
            feedId: feed.id,
        });
    }
}
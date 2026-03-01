
import { Feed, users } from "../../core/schema";
import { db } from "..";
import { feeds } from "../../core/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";


export async function createFeed(
    name: string,
    url: string,
    userId: string
): Promise<Feed> {
    const [feed] = await db
        .insert(feeds).values({
            name,
            url,
            userId
        })
        .returning();
    return feed;
}

export async function getFeedWithUser() {
    return await db
        .select({
            feedName: feeds.name,
            feedUrl: feeds.url,
            userName: users.name,
        })
        .from(feeds)
        .innerJoin(users, eq(feeds.userId, users.id))
}

export async function getFeedByUrl(url: string) {
    const [feed] = await db
        .select()
        .from(feeds)
        .where(eq(feeds.url, url));
    return feed;
}

export async function markFeedFetched(feedId: string) {
    await db
        .update(feeds)
        .set({
            lastFetchedAt: new Date(),
            updatedAt: new Date(),
        })
        .where(eq(feeds.id, feedId));
}


export async function getNextFeedToFetch() {
    const result = await db.execute(sql`
    SELECT *
    FROM feeds
    ORDER BY last_fetched_at NULLS FIRST
    LIMIT 1
  `);

    return result.rows[0] ?? null;
}

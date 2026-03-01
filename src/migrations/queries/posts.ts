import { db } from "..";
import { posts, feedFollows, feeds } from "../../schema";
import { eq, desc } from "drizzle-orm";

export async function createPost(data: {
    title: string;
    url: string;
    description?: string | null;
    publishedAt?: Date | null;
    feedId: string;
}) {
    try {
        const [post] = await db
            .insert(posts)
            .values({
                title: data.title,
                url: data.url,
                description: data.description ?? null,
                publishedAt: data.publishedAt ?? null,
                feedId: data.feedId,
            })
            .returning();

        return post;
    } catch (err) {
        return null;
    }
}

export async function getPostsForUser(
  userId: string,
  limit: number
) {
  return await db
    .select({
      title: posts.title,
      url: posts.url,
      description: posts.description,
      publishedAt: posts.publishedAt,
      feedName: feeds.name,
    })
    .from(posts)
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .innerJoin(feedFollows, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}
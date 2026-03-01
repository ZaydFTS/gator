import { User } from "./schema";
import { getPostsForUser } from "./migrations/queries/posts";

export async function handlerBrowse(
    cmdName: string,
    user: User,
    ...args: string[]
): Promise<void> {

    const limit = args[0] ? parseInt(args[0]) : 2;

    const posts = await getPostsForUser(user.id, limit);

    posts.forEach(post => {
        console.log(`* ${post.title}`);
        console.log(`  Feed: ${post.feedName}`);
        console.log(`  URL: ${post.url}`);
        if (post.publishedAt) {
            console.log(`  Published: ${post.publishedAt}`);
        }
        console.log("");
    });
}
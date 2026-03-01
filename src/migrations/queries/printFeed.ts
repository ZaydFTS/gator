import { Feed, User } from "../../core/schema";

export function printFeed(
  feed: Feed,
  user: User,
  follow: { userName: string; feedName: string }
): void {
  console.log(`* ${feed.name}`);
  console.log(`  URL: ${feed.url}`);
  console.log(`  User: ${user.name}`);
  console.log(`* ${follow.userName} is now following ${follow.feedName}`);
}
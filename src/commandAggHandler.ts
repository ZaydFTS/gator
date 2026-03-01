import { scrapeFeeds } from "./scrapeFeeds";
import { parseDuration } from "./parseDuration";

export async function handlerAgg(
    cmdName: string,
    ...args: string[]
): Promise<void> {

    if (args.length < 1) {
        throw new Error("Usage: agg <time_between_reqs>");
    }

    const durationStr = args[0];
    const timeBetweenRequests = parseDuration(durationStr);

    console.log(`Collecting feeds every ${durationStr}`);

    const handleError = (err: unknown) => {
        console.error("Error scraping feeds:", err);
    };

    await scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("\nShutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}
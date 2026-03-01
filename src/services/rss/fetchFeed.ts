import { XMLParser } from 'fast-xml-parser';
import { RSSFeed, RSSItem } from './rssTypes';
import { parse } from 'node:path';


export async function fetchFeed(url: string): Promise<RSSFeed> {
    const response = await fetch(url, {
        headers: {
            "User-Agent": "gator",
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
    }
    const xmlText = await response.text();

    const parser = new XMLParser({
        ignoreAttributes: false,
    });

    const parsed = parser.parse(xmlText);

    if (!parsed?.rss?.channel) {
        throw new Error("Invalid RSS feed: missing channel field");
    }
    const channel = parsed.rss.channel;

    const { title, link, description } = channel;

    if (
        typeof title !== "string" ||
        typeof link !== "string" ||
        typeof description !== "string"
    ) {
        throw new Error("Invalid RSS feed: missing required channel metadata");
    }

    let items: any[] = [];
    if (channel.item) {
        if (Array.isArray(channel.item)) {
            items = channel.item;
        } else {
            items = [channel.item];
        }
    }

    const parsedItems: RSSItem[] = [];

    for (const item of items) {
        const { title, link, description, pubDate } = item;
        if (
            typeof title !== "string" ||
            typeof link !== "string" ||
            typeof description !== "string" ||
            typeof pubDate !== "string"
        ) {
            continue;
        }
        parsedItems.push({
            title,
            link,
            description,
            pubDate,
        });

    }
    const feed: RSSFeed = {
        title,
        link,
        description,
        items: parsedItems,
    };
    return feed;
}

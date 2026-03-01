# Project Structure Documentation

## New Organized Structure

```
src/
├── index.ts                              # Main CLI entry point
├── core/
│   ├── config.ts                        # Configuration management
│   └── schema.ts                        # Database schema definitions
├── commands/
│   ├── commandHandler.ts               # Command handler types & login logic
│   ├── registry.ts                     # Command registration system
│   ├── addFeed.ts                      # Add RSS feed command
│   ├── agg.ts                          # Aggregation command
│   ├── browse.ts                       # Browse posts command
│   ├── follow.ts                       # Follow user command
│   ├── following.ts                    # Show following command
│   ├── getUsers.ts                     # List all users command
│   ├── getFeeds.ts                     # List all feeds command
│   └── unfollow.ts                     # Unfollow user command
├── middleware/
│   └── loggedIn.ts                     # Authentication middleware
├── services/
│   ├── scraper.ts                      # Feed scraping logic
│   └── rss/
│       ├── fetchFeed.ts                # RSS feed fetching
│       └── rssTypes.ts                 # RSS type definitions
├── utils/
│   ├── parseDuration.ts               # Duration string parser
│   └── parsePublishedDate.ts          # Date parsing utility
└── migrations/                          # Database migrations
    ├── index.ts                        # Database connection
    └── queries/
        ├── feed.ts
        ├── feedFollows.ts
        ├── posts.ts
        ├── login.ts
        ├── register.ts
        ├── users.ts
        └── printFeed.ts
```

## Key Improvements

### 1. **Separation of Concerns**
- **core/**: Application core (config, schema)
- **commands/**: All CLI commands organized in one place
- **middleware/**: Authentication and request processing
- **services/**: Business logic (feed scraping, RSS handling)
- **utils/**: Reusable utility functions
- **migrations/**: Database layer

### 2. **Naming Fixes**
- Fixed typo: `commandHnadler.ts` → `commandHandler.ts`
- Standardized file naming (camelCase for functions and handlers)

### 3. **Import Path Updates**
All imports have been updated to reference the new locations:
- `../../schema` → `../../core/schema`
- `../../config` → `../../core/config`
- `./commandHnadler` → `./commands/commandHandler`
- `./commandRegistry` → `./commands/registry`
- Command handlers now import from `./commands/*`
- `./middlewareLoggedIn` → `./middleware/loggedIn`
- Service utilities now import from `./services/*`
- Utility functions import from `./utils/*`

### 4. **Maintained Functionality**
- ✅ All code logic remains unchanged
- ✅ All type definitions imported from new locations
- ✅ Database schema properly referenced throughout
- ✅ Command registration system working with new structure
- ✅ Middleware authentication logic intact
- ✅ RSS feed fetching logic preserved

## File Locations Reference

| Old Location | New Location |
|---|---|
| src/schema.ts | src/core/schema.ts |
| src/config.ts | src/core/config.ts |
| src/commandHnadler.ts | src/commands/commandHandler.ts |
| src/commandRegistry.ts | src/commands/registry.ts |
| src/commandAddFeed.ts | src/commands/addFeed.ts |
| src/commandAggHandler.ts | src/commands/agg.ts |
| src/commandBrowse.ts | src/commands/browse.ts |
| src/commandFollow.ts | src/commands/follow.ts |
| src/commandFollowing.ts | src/commands/following.ts |
| src/commandGetAllUsers.ts | src/commands/getUsers.ts |
| src/commandGetFeedHandler.ts | src/commands/getFeeds.ts |
| src/commandUnfollow.ts | src/commands/unfollow.ts |
| src/middlewareLoggedIn.ts | src/middleware/loggedIn.ts |
| src/scrapeFeeds.ts | src/services/scraper.ts |
| src/parseDuration.ts | src/utils/parseDuration.ts |
| src/parsePublishedDate.ts | src/utils/parsePublishedDate.ts |
| src/RSS/fetchFeed.ts | src/services/rss/fetchFeed.ts |
| src/RSS/rssTypes.ts | src/services/rss/rssTypes.ts |

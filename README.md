# Gator - RSS Feed Aggregator

A command-line RSS feed aggregator built with TypeScript, Node.js, and PostgreSQL. Gator allows you to subscribe to RSS feeds, organize them into collections, and browse the latest articles seamlessly from your terminal.

## Features

- **User Management**: Create accounts and login to manage your personal feeds
- **Feed Management**: Add RSS feeds and organize them with custom names
- **Social Following**: Follow other users' feeds and discover new content
- **Feed Aggregation**: Automatically fetch and aggregate posts from all your subscribed feeds
- **Post Browsing**: Browse and view recent posts from your subscribed feeds

## Prerequisites

Before you can run Gator, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download PostgreSQL](https://www.postgresql.org/)

### Verify Installation

To verify you have the correct versions installed, run:

```bash
node --version
npm --version
psql --version
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ZaydFTS/gator.git
cd gator
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database migrations:

```bash
npm run generate
npm run migrate
```

## Configuration

Gator stores its configuration in a `.gatorconfig.json` file in your home directory (`~/.gatorconfig.json`). This file stores your database connection string and current user information.

### Setting Up the Config File

The config file will be created automatically when you run the application, but you need to provide your PostgreSQL database URL.

**Example `.gatorconfig.json`:**

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator_db",
  "current_user_name": "your_username"
}
```

**Required:**
- `db_url`: The connection string to your PostgreSQL database in the format `postgres://user:password@host:port/database`

**Optional:**
- `current_user_name`: Your current logged-in username (set automatically when you login)

### Creating Your Database

Before running Gator, create a PostgreSQL database:

```bash
createdb gator_db
```

Then update your `.gatorconfig.json` with the appropriate connection string for your setup.

## Running the Program

Start Gator by running:

```bash
npm start <command> [arguments]
```

## Available Commands

### User Management

#### `register <username> <password`
Create a new user account:
```bash
npm start register johndoe mypassword
```

#### `login <username> <password`
Log into your account:
```bash
npm start login johndoe mypassword
```

### Feed Management

#### `addfeed <name> <url>` (requires login)
Add an RSS feed to your collection:
```bash
npm start addfeed "TechNews" "https://example.com/feed.xml"
```

#### `feeds`
List all available feeds in the system:
```bash
npm start feeds
```

#### `browse [limit]` (requires login)
Browse the latest posts from your followed feeds. Optionally specify how many posts to display (default: 2):
```bash
npm start browse
npm start browse 5
```

#### `agg`
Aggregate and fetch all posts from your subscribed feeds:
```bash
npm start agg
```

### User Discovery & Following

#### `users`
List all users in the system:
```bash
npm start users
```

#### `follow <username>` (requires login)
Follow another user's feeds:
```bash
npm start follow johndoe
```

#### `following` (requires login)
View the list of users you're following:
```bash
npm start following
```

#### `unfollow <username>` (requires login)
Stop following a user:
```bash
npm start unfollow johndoe
```

### Database Management

#### `reset`
Reset the database (clears all data and restarts migrations):
```bash
npm start reset
```

## Workflow Example

Here's a typical workflow to get started:

```bash
# 1. Register a new account
npm start register alice mypassword

# 2. Log in with your account
npm start login alice mypassword

# 3. Add a feed
npm start addfeed "Hacker News" "https://news.ycombinator.com/rss"

# 4. Aggregate feeds to fetch posts
npm start agg

# 5. Browse your feeds
npm start browse 10

# 6. Discover and follow other users
npm start users
npm start follow bob

# 7. View who you're following
npm start following
```

## Development

### Available npm Scripts

- `npm start` - Run the CLI application
- `npm run generate` - Generate migrations from schema changes
- `npm run migrate` - Apply pending database migrations
- `npm test` - Run tests (not currently configured)

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Build Tool**: tsx
- **Package Manager**: npm

## Project Structure

```
src/
├── migrations/        # Database migrations and queries
├── RSS/              # RSS feed fetching utilities
├── command*.ts       # CLI command handlers
├── config.ts         # Configuration management
├── index.ts          # Main CLI entry point
├── schema.ts         # Database schema
└── middleware*.ts    # Command middleware (auth checks)
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running: `sudo service postgresql start` (Linux) or open PostgreSQL app (macOS)
- Check your database URL in `.gatorconfig.json`
- Verify the database exists: `psql -l | grep gator_db`

### Command Not Found
- Make sure you're using the correct command syntax: `npm start <command> <args>`
- Run `npm start` to see available commands

### Authentication Failed
- Double-check your username and password
- Ensure you've registered before logging in

## Contributing

Feel free to fork this project, make improvements, and submit pull requests.

## License

ISC

## Author

Created as a guided project learning exercise.

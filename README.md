<div align="center">

# 🐊 Gator

### A Modern CLI RSS Feed Aggregator

*Stay informed, stay connected, all from your terminal*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Quick Start](#-quick-start)
- [Commands](#-commands)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Gator** is a powerful command-line RSS feed aggregator built with modern technologies. Manage your RSS feeds, follow other users, and stay up-to-date with the latest content—all from the comfort of your terminal.

Perfect for developers, power users, and anyone who loves the efficiency of CLI tools! 🚀

## ✨ Features

<table>
<tr>
<td width="50%">

### 👤 User Management
- ✅ Secure account creation
- ✅ User authentication
- ✅ Profile management

### 📰 Feed Management
- ✅ Add & organize RSS feeds
- ✅ Custom feed naming
- ✅ Automatic feed updates

</td>
<td width="50%">

### 👥 Social Features
- ✅ Follow other users
- ✅ Discover new content
- ✅ Share feed collections

### 📊 Content Aggregation
- ✅ Auto-fetch latest posts
- ✅ Cross-feed browsing
- ✅ Customizable post limits

</td>
</tr>
</table>

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| 🟢 **Node.js** | v18 or higher | [Download](https://nodejs.org/) |
| 📦 **npm** | Included with Node.js | - |
| 🐘 **PostgreSQL** | v12 or higher | [Download](https://www.postgresql.org/) |

### ✅ Verify Installation

```bash
# Check your installations
node --version    # Should be v18+
npm --version     # Should be 8+
psql --version    # Should be v12+
```

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ZaydFTS/gator.git
cd gator
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up the Database

```bash
# First, create your database
createdb gator_db

# Generate and apply migrations
npm run generate
npm run migrate
```

> **💡 Tip:** Make sure PostgreSQL is running before executing these commands!

---

## ⚙️ Configuration

Gator uses a configuration file located at `~/.gatorconfig.json` to store your database connection and user settings.

### 📝 Configuration File Structure

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator_db",
  "current_user_name": "your_username"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `db_url` | ✅ Yes | PostgreSQL connection string |
| `current_user_name` | ⚪ Auto-set | Your logged-in username |

### 🔐 Example Configuration

```json
{
  "db_url": "postgres://gator_user:secretpass@localhost:5432/gator_db",
  "current_user_name": "alice"
}
```

> **⚠️ Important:** The configuration file will be created automatically on first run. Make sure to update the `db_url` with your PostgreSQL credentials.

---

## 🚀 Quick Start

Get up and running in 60 seconds:

```bash
# 1️⃣ Register a new account
npm start register alice mypassword

# 2️⃣ Log in
npm start login alice mypassword

# 3️⃣ Add your first feed
npm start addfeed "Hacker News" "https://news.ycombinator.com/rss"

# 4️⃣ Fetch the latest posts
npm start agg 1s

# 5️⃣ Browse your feeds
npm start browse 10
```

**🎉 Congratulations!** You're now ready to explore Gator's full capabilities.

---

## 📚 Commands

### 👤 User Management

#### `register <username> <password>`
Create a new user account and start using Gator.

```bash
npm start register johndoe mypassword
```

#### `login <username> <password>`
Authenticate with your credentials and access your feeds.

```bash
npm start login johndoe mypassword
```

---

### 📰 Feed Management

#### `addfeed <name> <url>` 🔒
Add an RSS feed to your personal collection.

```bash
npm start addfeed "TechCrunch" "https://techcrunch.com/feed/"
npm start addfeed "Dev.to" "https://dev.to/feed"
```

> 🔒 *Requires authentication*

#### `feeds`
Display all available feeds in the system.

```bash
npm start feeds
```

**Output:**
```
📰 Available Feeds
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Hacker News
2. TechCrunch
3. Dev.to
```

#### `browse [limit]` 🔒
Browse the latest posts from feeds you follow. Control the number of posts displayed.

```bash
npm start browse        # Default: 2 posts
npm start browse 5      # Show 5 posts
npm start browse 20     # Show 20 posts
```

> 🔒 *Requires authentication*

#### `agg <time_between_requests>`
Fetch and aggregate posts from all subscribed feeds continuously.

```bash
npm start agg 1s        # Fetch every second
npm start agg 5m        # Fetch every 5 minutes
npm start agg 1h        # Fetch every hour
```

---

### 👥 Social Features

#### `users`
Discover all registered users in the Gator community.

```bash
npm start users
```

#### `follow <username>` 🔒
Follow another user to access their feed collection.

```bash
npm start follow johndoe
npm start follow alice
```

> 🔒 *Requires authentication*

#### `following` 🔒
View your current following list.

```bash
npm start following
```

**Output:**
```
👥 Following
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• johndoe
• alice
• bob
```

> 🔒 *Requires authentication*

#### `unfollow <username>` 🔒
Stop following a user and remove their feeds from your feed.

```bash
npm start unfollow johndoe
```

> 🔒 *Requires authentication*

---

### 🛠️ Database Management

#### `reset`
Reset the entire database (clears all data and restarts migrations).

```bash
npm start reset
```

> **⚠️ Warning:** This action is irreversible and will delete all data!

---

## 💻 Development

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | 🚀 Run the CLI application |
| `npm run generate` | 🔄 Generate new migrations from schema changes |
| `npm run migrate` | ⬆️ Apply pending database migrations |
| `npm test` | 🧪 Run tests *(coming soon)* |

### 🏗️ Technology Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node.js |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Build Tool** | tsx |

</div>

### 📁 Project Structure

```
src/
├── 📂 commands/           # Command handlers
│   ├── addFeed.ts
│   ├── agg.ts
│   ├── browse.ts
│   ├── commandHandler.ts
│   ├── follow.ts
│   ├── following.ts
│   ├── getFeeds.ts
│   ├── getUsers.ts
│   ├── registry.ts
│   └── unfollow.ts
├── 📂 core/               # Core configuration
│   ├── config.ts
│   └── schema.ts
├── 📂 middleware/         # Authentication & middleware
│   └── loggedIn.ts
├── 📂 migrations/         # Database migrations
│   ├── queries/
│   └── meta/
├── 📂 services/           # External services
│   ├── scraper.ts
│   └── rss/
│       ├── fetchFeed.ts
│       └── rssTypes.ts
├── 📂 utils/              # Utility functions
│   ├── parseDuration.ts
│   └── parsePublishedDate.ts
└── 📄 index.ts            # Main entry point
```

---

## 🔧 Troubleshooting

<details>
<summary><b>🔴 Database Connection Error</b></summary>

**Possible Solutions:**
- ✅ Ensure PostgreSQL is running:
  ```bash
  # Linux/WSL
  sudo service postgresql start
  
  # macOS
  brew services start postgresql
  ```
- ✅ Check your database URL in `~/.gatorconfig.json`
- ✅ Verify the database exists:
  ```bash
  psql -l | grep gator_db
  ```
- ✅ Test connection:
  ```bash
  psql -U your_username -d gator_db
  ```

</details>

<details>
<summary><b>🔴 Command Not Found</b></summary>

**Possible Solutions:**
- ✅ Ensure you're using correct syntax: `npm start <command> <args>`
- ✅ Check if you're in the correct directory
- ✅ Verify Node.js is installed: `node --version`
- ✅ Reinstall dependencies: `npm install`

</details>

<details>
<summary><b>🔴 Authentication Failed</b></summary>

**Possible Solutions:**
- ✅ Double-check your username and password
- ✅ Ensure you've registered before logging in
- ✅ Try resetting your account (register again)
- ✅ Check if the database has users: `npm start users`

</details>

<details>
<summary><b>🔴 Feed Not Updating</b></summary>

**Possible Solutions:**
- ✅ Verify the RSS feed URL is valid
- ✅ Run `npm start agg 1s` to force an update
- ✅ Check your internet connection
- ✅ Ensure the feed format is supported (RSS 2.0, Atom)

</details>

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✍️ Commit your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🎉 Open a Pull Request

### 💡 Ideas for Contributions

- 🎨 Add more feed formats support
- 🔍 Implement search functionality
- 📊 Add statistics and analytics
- 🎯 Create filters and tags
- 🌐 Add export/import features
- 🧪 Write comprehensive tests

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Created with ❤️ as a guided learning project.

---

<div align="center">

### ⭐ If you find Gator useful, please consider giving it a star!

**Made with TypeScript, PostgreSQL, and lots of ☕**

[Report Bug](https://github.com/ZaydFTS/gator/issues) · [Request Feature](https://github.com/ZaydFTS/gator/issues)

</div>

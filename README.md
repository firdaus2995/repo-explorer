# GitHub Repositories Explorer 🚀

A React application that allows users to search for GitHub users and view their repositories using the GitHub API.

## 📌 Features

- ✅ Search for up to 5 users based on a username query.
- ✅ Click on a username to reveal a dropdown with their repositories.
- ✅ Display repository name, description, and star count.
- ✅ Responsive design with Tailwind CSS.
- ✅ Efficient state management using Redux Toolkit.
- ✅ Error handling and loading states.

## 🛠️ Tech Stack

- React (UI Framework)
- Redux Toolkit (State Management)
- TypeScript (Static Typing)
- Tailwind CSS (Styling)
- GitHub API (Data Source)
- Axios (HTTP Requests)

## 🚀 Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/firdaus2995/repo-explorer.git
   cd github-repo-explorer
   ```
2. **Install dependencies**
   ```sh
   yarn install
   ```
3. **Start the development server**
   ```sh
   yarn start
   ```

The app will be available at http://localhost:3000.

## 📦 Project Structure

/github-repo-explorer <br>
├── /src <br>
│ ├── /store # Redux store and slices <br>
│ │ ├── githubSlice.ts <br>
│ │ ├── store.ts <br>
│ ├── App.tsx # Main App component <br>
│ ├── index.tsx # Entry point <br>
│ ├── styles.css # Global styles <br>
├── package.json # Dependencies & scripts <br>
├── README.md # Project documentation <br>
└── tsconfig.json # TypeScript config <br>

## 🔧 Configuration

This project fetches data from GitHub's public API. No additional configuration is required.

## 🚀 Deployment

You can deploy this app using GitHub Pages, Vercel, or Netlify. <br>
**Example (GitHub Pages):**

```sh
yarn build
npm install -g gh-pages
gh-pages -d build
```

## 🛠️ Troubleshooting

If you encounter errors, try the following: <br>

- Make sure you have Node.js (v16+) and Yarn installed.
- If dependencies fail, run:

```sh
yarn install --force
```

- Check your API rate limits: <a href="https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api" target="_blank">GitHub API Rate Limit.</a>

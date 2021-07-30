module.exports = {
  reactStrictMode: true,
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
  images: {
    domains: ['i.ytimg.com'],
  },
}

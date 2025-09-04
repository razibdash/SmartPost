const { TwitterApi } = require('twitter-api-v2');

async function postToTwitter(user, content) {
    const client = new TwitterApi({
        appKey: process.env.TWITTER_CONSUMER_KEY,
        appSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: user.twitter.token,
        accessSecret: user.twitter.tokenSecret
    });

    await client.v2.tweet(content);
}

module.exports = { postToTwitter };
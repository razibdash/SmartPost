const { postToTwitter } = require('./twitterService');
const { postToLinkedIn } = require('./linkedinService');
const { postToFacebook } = require('./facebookService');

async function postToPlatform(user, platform, content) {
  switch ((platform || '').toLowerCase()) {
    case 'twitter':
      if (!user?.twitter?.token) throw new Error('Twitter not connected');
      return postToTwitter(user, content);
    case 'linkedin':
      if (!user?.linkedin?.accessToken) throw new Error('LinkedIn not connected');
      return postToLinkedIn(user, content);
    case 'facebook':
      if (!user?.facebook?.accessToken) throw new Error('Facebook not connected');
      return postToFacebook(user, content);
    default:
      throw new Error('Unsupported platform');
  }
}

module.exports = { postToPlatform };

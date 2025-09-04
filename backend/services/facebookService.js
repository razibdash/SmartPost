const axios = require('axios');

// Post content to Facebook (user feed)
async function postToFacebook(user, content) {
    try {
        // Step 1: Get user profile to confirm access
        const profileResponse = await axios.get(
            `https://graph.facebook.com/me?access_token=${user.facebook.accessToken}`
        );

        const userId = profileResponse.data.id;

        // Step 2: Post content to user's feed
        const postResponse = await axios.post(
            `https://graph.facebook.com/${userId}/feed`,
            {
                message: content
            },
            {
                headers: {
                    Authorization: `Bearer ${user.facebook.accessToken}`
                }
            }
        );

        console.log("✅ Facebook Post Successful:", postResponse.data);
    } catch (err) {
        console.error("❌ Facebook Post Error:", err.response?.data || err.message);
    }
}

module.exports = { postToFacebook };

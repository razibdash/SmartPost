const axios = require('axios');

/**
 * Post content to LinkedIn
 * @param {Object} user - user object with LinkedIn credentials
 * @param {string} content - text content to post
 */
async function postToLinkedIn(user, content) {
    try {
        // Step 1: Get LinkedIn user ID
        const profileResponse = await axios.get("https://api.linkedin.com/v2/me", {
            headers: {
                Authorization: `Bearer ${user.linkedin.accessToken}`
            }
        });

        const userId = profileResponse.data.id;

        // Step 2: Create LinkedIn post
        const postResponse = await axios.post(
            "https://api.linkedin.com/v2/ugcPosts",
            {
                author: `urn:li:person:${userId}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: {
                            text: content
                        },
                        shareMediaCategory: "NONE"
                    }
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${user.linkedin.accessToken}`,
                    "Content-Type": "application/json",
                    "X-Restli-Protocol-Version": "2.0.0"
                }
            }
        );

        console.log("✅ LinkedIn Post Successful:", postResponse.data);
        return postResponse.data;
    } catch (err) {
        console.error("❌ LinkedIn Post Error:", err.response?.data || err.message);
        throw err;
    }
}

module.exports = { postToLinkedIn };

import { Octokit } from "octokit";
async function createIssue(owner, title, body) {
    const octokit = new Octokit({
        auth: "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"
    });

    try {
        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: owner,
            repo: 'dcard-blog',
            title: title,
            body: body,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    } catch (error) {
        console.error("Post error:", error);
    }
}


createIssue("wizzyLeo", "mot", "test")

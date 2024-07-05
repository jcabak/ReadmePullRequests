const fs = require('fs');
const fetch = require('node-fetch');

const username = 'jcabak';
const accessToken = process.env.GH_TOKEN;
const shouldBold = true; // Set to true by default
const includePullRequestLinks = true; // New variable to include pull request links
const favoriteRepositories = ['rails', 'microsoft', 'apple', 'home-assistant', 'google', 'raspberry', 'twitter', 'mozilla', 'facebook', 'googlechrome', 'nasa', 'w3c', 'basecamp'];
const ignoredUsers = ['BinaryWorlds', 'LukasJoswiak'];

async function fetchPullRequests() {
    try {
        const closedPullRequests = await fetchPullRequestsByState('closed');
        const openPullRequests = await fetchPullRequestsByState('open');

        const closedMarkdownContent = await generateMarkdownTable(closedPullRequests, 'Closed Pull Requests');
        const openMarkdownContent = await generateMarkdownTable(openPullRequests, 'Open Pull Requests');

        const readmeContent = fs.readFileSync('README.md', 'utf8');
        const newContent = readmeContent.replace(/<!-- PULL_REQUESTS -->[\s\S]*<!-- PULL_REQUESTS_END -->/, `<!-- PULL_REQUESTS -->\n${closedMarkdownContent}\n${openMarkdownContent}<!-- PULL_REQUESTS_END -->`);
        fs.writeFileSync('README.md', newContent);
    } catch (error) {
        console.error('Error fetching pull requests:', error);
    }
}

async function fetchPullRequestsByState(state) {
    try {
        const response = await fetch(`https://api.github.com/search/issues?q=is:pr+is:${state}+author:${username}&per_page=150`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(`Error fetching ${state} pull requests:`, error);
        return [];
    }
}

async function generateMarkdownTable(pullRequests, title) {
    let markdownContent = `## ${title}\n\n| Icon | User | Repository | Stars | Forks | Pull Request |\n|:----|:----|:----|:----|:----|:----|\n`;

    for (const pullRequest of pullRequests) {
        const repositoryOwnerAvatarUrl = await fetchRepositoryOwnerAvatar(pullRequest.repository_url);
        const repositoryOwner = await fetchRepositoryOwner(pullRequest.repository_url);

        // Ignore the repository if the owner is in the ignoredUsers list
        if (ignoredUsers.includes(repositoryOwner)) {
            continue;
        }

        const repositoryUrl = await fetchRepositoryUrl(pullRequest.repository_url);
        const repositoryName = await fetchRepositoryName(pullRequest.repository_url);
        const repositoryStars = await fetchRepositoryStars(pullRequest.repository_url);
        const repositoryForks = await fetchRepositoryForks(pullRequest.repository_url);

        const repositoryOwnerUrl = `https://github.com/${repositoryOwner}`;
        const pullRequestLink = pullRequest.html_url; // Get the pull request link

        const pullRequestColumnContent = includePullRequestLinks ? `[${pullRequest.title}](${pullRequestLink})` : pullRequest.title;

        if (shouldBold && favoriteRepositories.includes(repositoryOwner.toLowerCase())) {
            markdownContent += `| <img src="${repositoryOwnerAvatarUrl}" alt="Logo ${repositoryOwner}" width="30" height="30"> | [**${repositoryOwner}**](${repositoryOwnerUrl}) | [**${repositoryName}**](${repositoryUrl}) | **${repositoryStars}** | **${repositoryForks}** | **${pullRequestColumnContent}** |\n`;
        } else {
            markdownContent += `| <img src="${repositoryOwnerAvatarUrl}" alt="Logo ${repositoryOwner}" width="30" height="30"> | [${repositoryOwner}](${repositoryOwnerUrl}) | [${repositoryName}](${repositoryUrl}) | ${repositoryStars} | ${repositoryForks} | ${pullRequestColumnContent} |\n`;
        }
    }

    return markdownContent;
}

async function fetchRepositoryOwner(repoUrl) {
    try {
        const response = await fetch(repoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.owner.login;
    } catch (error) {
        console.error('Error fetching repository owner:', error);
        return '';
    }
}

async function fetchRepositoryUrl(repoUrl) {
    try {
        const response = await fetch(repoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.html_url;
    } catch (error) {
        console.error('Error fetching repository URL:', error);
        return '';
    }
}

async function fetchRepositoryName(repoUrl) {
    try {
        const response = await fetch(repoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching repository name:', error);
        return '';
    }
}

async function fetchRepositoryOwnerAvatar(repoUrl) {
    try {
        const response = await fetch(repoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.owner.avatar_url;
    } catch (error) {
        console.error('Error fetching repository owner avatar URL:', error);
        return '';
    }
}

async function fetchRepositoryStars(repoUrl) {
    try {
        const response = await fetch(repoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.stargazers_count;
    } catch (error) {
        console.error('Error fetching repository stars:', error);
        return 0;
    }
}

async function fetchRepositoryForks(repoUrl) {
    try {
        const response = await fetch(repoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data.forks_count;
    } catch (error) {
        console.error('Error fetching repository forks:', error);
        return 0;
    }
}

fetchPullRequests();

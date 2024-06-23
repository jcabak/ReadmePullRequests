const fs = require('fs');
const fetch = require('node-fetch');

const username = 'jcabak';
const accessToken = process.env.GH_TOKEN;
const shouldBold = true; // Set to true by default
const favoriteRepositories = ['rails', 'microsoft', 'apple', 'home-assistant', 'google', 'raspberry', 'twitter', 'mozilla', 'facebook', 'googlechrome', 'nasa', 'w3c', 'basecamp'];

async function fetchPullRequests() {
    try {
        const openResponse = await fetch(`https://api.github.com/search/issues?q=is:pr+is:closed+author:${username}&per_page=150`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const openData = await openResponse.json();
        const pullRequests = openData.items;

        let markdownContent = '| Icon | User | Repository | Stars | Forks | Pull Request |\n|:----|:----|:----|:----|:----|:----|\n';

        for (const pullRequest of pullRequests) {
            const repositoryOwnerAvatarUrl = await fetchRepositoryOwnerAvatar(pullRequest.repository_url);
            const repositoryOwner = await fetchRepositoryOwner(pullRequest.repository_url);
            const repositoryUrl = await fetchRepositoryUrl(pullRequest.repository_url);
            const repositoryName = await fetchRepositoryName(pullRequest.repository_url);
            const repositoryStars = await fetchRepositoryStars(pullRequest.repository_url);
            const repositoryForks = await fetchRepositoryForks(pullRequest.repository_url);

            if (shouldBold && favoriteRepositories.includes(repositoryOwner.toLowerCase())) {
                markdownContent += `| <img src="${repositoryOwnerAvatarUrl}" alt="Logo ${repositoryOwner}" width="30" height="30"> | [**${repositoryOwner}**](${repositoryUrl}) | [**${repositoryName}**](${repositoryUrl}) | **${repositoryStars}** | **${repositoryForks}** | **${pullRequest.title}** |\n`;
            } else {
                markdownContent += `| <img src="${repositoryOwnerAvatarUrl}" alt="Logo ${repositoryOwner}" width="30" height="30"> | [${repositoryOwner}](${repositoryUrl}) | [${repositoryName}](${repositoryUrl}) | ${repositoryStars} | ${repositoryForks} | ${pullRequest.title} |\n`;
            }
        }

        const readmeContent = fs.readFileSync('README.md', 'utf8');
        const newContent = readmeContent.replace(/<!-- PULL_REQUESTS -->[\s\S]*<!-- PULL_REQUESTS_END -->/, `<!-- PULL_REQUESTS -->\n${markdownContent}<!-- PULL_REQUESTS_END -->`);
        fs.writeFileSync('README.md', newContent);
    } catch (error) {
        console.error('Error fetching pull requests:', error);
    }
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
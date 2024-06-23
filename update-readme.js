// Import potrzebnych modułów
const fetch = require('node-fetch');
const fs = require('fs').promises;

// Ustawienia - proszę zdefiniować swoje wartości
const username = 'jcabak'; // Zmodyfikuj na swoją nazwę użytkownika GitHub
const accessToken = process.env.GH_TOKEN; // Pobranie tokena dostępu z zmiennych środowiskowych

// URL do API GitHuba dla zamkniętych Pull Requests
const closedPRUrl = `https://api.github.com/search/issues?q=is:pr+is:closed+author:${username}&per_page=100`;

// Tabela ulubionych repozytoriów
const favoriteRepositories = [
    'rails', 'microsoft', 'apple', 'home-assistant', 'google', 'raspberry', 
    'twitter', 'mozilla', 'facebook', 'googlechrome', 'nasa', 'w3c', 'basecamp'
];

// URL do API GitHuba dla otwartych Pull Requests
const openPRUrl = `https://api.github.com/search/issues?q=is:pr+is:open+author:${username}&per_page=20`;

// Funkcja do pobierania i formatowania danych
async function fetchAndFormatPullRequests() {
    try {
        // Pobranie zamkniętych Pull Requests
        const closedResponse = await fetch(closedPRUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const closedData = await closedResponse.json();
        const closedPRTable = formatPullRequestsTable(closedData.items, 'Closed Pull Requests');

        // Pobranie otwartych Pull Requests
        const openResponse = await fetch(openPRUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const openData = await openResponse.json();
        const openPRTable = formatPullRequestsTable(openData.items, 'Open Pull Requests');

        // Zwracanie sformatowanego markdowna
        return `${favoriteRepositoriesTable()}\n\n${closedPRTable}\n\n${openPRTable}`;
    } catch (error) {
        console.error('Error fetching or formatting pull requests:', error);
        return '';
    }
}

// Funkcja do formatowania tabeli ulubionych repozytoriów
function favoriteRepositoriesTable() {
    let markdownContent = `### My Favorite Repositories\n\n`;
    markdownContent += '| Repository |\n';
    markdownContent += '|:-----------|\n';

    favoriteRepositories.forEach(repo => {
        markdownContent += `| [${repo}](https://github.com/${repo}) |\n`;
    });

    return markdownContent;
}

// Funkcja do formatowania tabeli Pull Requests
function formatPullRequestsTable(pullRequests, heading) {
    let markdownContent = `### ${heading}\n\n`;
    markdownContent += '| Icon | User | Repository | Stars | Forks | Pull Request |\n';
    markdownContent += '|:----|:----|:----|:----|:----|:----|\n';

    for (const pr of pullRequests) {
        const repositoryUrl = pr.repository_url.replace('api.github.com/repos', 'github.com').replace('/pulls', '/pull');
        const repositoryName = pr.repository_url.split('/').pop();

        const user = pr.user.login;
        const userUrl = `https://github.com/${user}`;
        const userAvatar = pr.user.avatar_url;

        const stars = pr.repository.stargazers_count;
        const forks = pr.repository.forks_count;

        const prTitle = pr.title;
        const prUrl = pr.html_url;

        markdownContent += `| ![User Avatar](${userAvatar}&s=30) | [${user}](${userUrl}) | [${repositoryName}](${repositoryUrl}) | ${stars} | ${forks} | [${prTitle}](${prUrl}) |\n`;
    }

    return markdownContent;
}

// Główna funkcja wykonawcza
async function updateReadme() {
    const markdownContent = await fetchAndFormatPullRequests();

    // Zapis do pliku README.md
    try {
        await fs.writeFile('README.md', markdownContent);
        console.log('README.md updated successfully.');
    } catch (error) {
        console.error('Error writing to README.md:', error);
    }
}

// Wywołanie głównej funkcji
updateReadme();

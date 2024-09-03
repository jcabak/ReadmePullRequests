# Readme Pull Requests
ReadmePullRequests is designed to automate the process of updating the README.md file in a GitHub repository whenever a pull request (PR) is created.

In addition to automating the update of the README.md file, the workflow also offers advanced customization options:

- Bold Selected Repositories: You can choose to highlight specific repositories by making them bold in the README.md file. This allows you to emphasize certain repositories among the list that the workflow generates.

- Hide Specific Repositories: The workflow provides an option to exclude certain repositories from appearing in the README.md file. This is useful if you want to keep the focus on only the most relevant repositories.

- Direct Links to Pull Requests: You have the option to include direct links to specific pull requests within the README.md. This feature allows users to quickly access the pull requests associated with the changes, providing more context or facilitating easier navigation.

These features make the workflow highly flexible, allowing you to tailor the content of your README.md file to suit your project's needs while maintaining up-to-date documentation.


## Instructions

1. Add the comment `<!-- PULL_REQUESTS -->` (entry point) within `README.md`. 

2. Now you have to create a workflow file.

`.github/workflows/ReadmePullRequests.yml`

```yml
name: Update ReadmePullRequests

on:
  schedule:
    - cron: '*/30 * * * *'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: Update this repo's README with recent activity

    steps:
      - uses: actions/checkout@v2
      - uses: jcabak/ReadmePullRequests@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

3. Create a GitHub token. You have to create a [personal access token](https://github.com/settings/tokens?type=beta). You can find more information [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

4. Go to your repository > Settings > Secrets and variables > Actions > New repository secret  Secret part of repository for using it and call it as `GH_TOKEN` and paste your token in the value part.


The above job runs every half an hour, you can change it as you wish based on the [cron syntax](https://jasonet.co/posts/scheduled-actions/#the-cron-syntax).


### Override defaults

Use the following `input params` to customize it for your use case:-

| Input Param | Default Value | Description |
|--------|--------|--------|
| `shouldBold` | true | bold favorite repositories |
| `includePullRequestLinks` | false | make url to specific pull request |
| `favoriteRepositories` | null | table for favorites users |
| `ignoredUsers` | null | table for ignored users |


```yml
name: Update ReadmePullRequests

on:
  schedule:
    - cron: '*/30 * * * *'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    name: Update this repo's README with recent activity

    steps:
      - uses: actions/checkout@v2
      - uses: jcabak/ReadmePullRequests@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          shouldBold: true
          includePullRequestLinks: false
          favoriteRepositories : []'rails', 'microsoft', 'apple', 'home-assistant', 'google', 'raspberry', 'twitter', 'mozilla', 'facebook', 'googlechrome', 'nasa', 'w3c', 'basecamp'
          ignoredUsers: ['BinaryWorlds', 'LukasJoswiak'];
```

## Closed Pull Requests
<!-- CLOSED_PULL_REQUESTS_START -->
<!-- CLOSED_PULL_REQUESTS_END -->

## Open Pull Requests
<!-- OPEN_PULL_REQUESTS_START -->
<!-- OPEN_PULL_REQUESTS_END -->
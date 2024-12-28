# Readme Pull Requests
ReadmePullRequests is designed to automate the process of updating the README.md file in a GitHub repository whenever a pull request (PR) is created.

In addition to automating the update of the README.md file, the workflow also offers advanced customization options:

- Bold Selected Repositories: You can choose to highlight specific repositories by making them bold in the README.md file. This allows you to emphasize certain repositories among the list that the workflow generates.

- Hide Specific Repositories: The workflow provides an option to exclude certain repositories from appearing in the README.md file. This is useful if you want to keep the focus on only the most relevant repositories.

- Direct Links to Pull Requests: You have the option to include direct links to specific pull requests within the README.md. This feature allows users to quickly access the pull requests associated with the changes, providing more context or facilitating easier navigation.

These features make the workflow highly flexible, allowing you to tailor the content of your README.md file to suit your project's needs while maintaining up-to-date documentation.


## Instructions

1. Add the comment ```<!-- PULL_REQUESTS -->``` (entry point) within `README.md`. 

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
| `boldFavorites` | true | bold favorite repositories |
| `includePullRequestLinks` | false | make url to specific pull request |
| `favoriteRepositories` | null | table for favorites users |
| `ignoredRepositories` | null | table for ignored users |


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
          boldFavorites: true
          includePullRequestLinks: false
          favoriteRepositories : ['rails', 'microsoft', 'apple', 'home-assistant', 'google', 'raspberry', 'twitter', 'mozilla', 'facebook', 'googlechrome', 'nasa', 'w3c', 'basecamp']
          ignoredRepositories: ['BinaryWorlds', 'LukasJoswiak'];
```

## Closed Pull Requests
<!-- CLOSED_PULL_REQUESTS_START -->
| Icon | User | Repository | Stars | Forks | Pull Request |
|:----|:----|:----|:----|:----|:----|
| <img src="https://avatars.githubusercontent.com/u/13131?v=4" alt="Logo basecamp" width="30" height="30"> | [**basecamp**](https://github.com/basecamp) | [**kamal-site**](https://github.com/basecamp/kamal-site) | **59** | **77** | **Added subtitles for video** |
| <img src="https://avatars.githubusercontent.com/u/13131?v=4" alt="Logo basecamp" width="30" height="30"> | [**basecamp**](https://github.com/basecamp) | [**kamal-site**](https://github.com/basecamp/kamal-site) | **59** | **77** | **Accessibility and Performance improvements** |
| <img src="https://avatars.githubusercontent.com/u/379216?v=4" alt="Logo w3c" width="30" height="30"> | [**w3c**](https://github.com/w3c) | [**w3c.github.io**](https://github.com/w3c/w3c.github.io) | **142** | **40** | **Performance improvement** |
| <img src="https://avatars.githubusercontent.com/u/1506386?v=4" alt="Logo Orange-OpenSource" width="30" height="30"> | [Orange-OpenSource](https://github.com/Orange-OpenSource) | [Orange-Confort-plus](https://github.com/Orange-OpenSource/Orange-Confort-plus) | 43 | 25 | fix typos |
| <img src="https://avatars.githubusercontent.com/u/923885?v=4" alt="Logo inclusive-design" width="30" height="30"> | [inclusive-design](https://github.com/inclusive-design) | [wecount.inclusivedesign.ca](https://github.com/inclusive-design/wecount.inclusivedesign.ca) | 8 | 20 | fix: sufficient contrast (resolves #1739) |
| <img src="https://avatars.githubusercontent.com/u/51910064?v=4" alt="Logo simple-login" width="30" height="30"> | [simple-login](https://github.com/simple-login) | [website](https://github.com/simple-login/website) | 44 | 33 | Added variables. Texts were permanently assigned. |
| <img src="https://avatars.githubusercontent.com/u/4223?v=4" alt="Logo rails" width="30" height="30"> | [**rails**](https://github.com/rails) | [**website**](https://github.com/rails/website) | **76** | **111** | **Accessibility and Performance improvements** |
| <img src="https://avatars.githubusercontent.com/u/14127308?v=4" alt="Logo EbookFoundation" width="30" height="30"> | [EbookFoundation](https://github.com/EbookFoundation) | [free-programming-books](https://github.com/EbookFoundation/free-programming-books) | 342721 | 62122 | fix typo |
| <img src="https://avatars.githubusercontent.com/u/6154722?v=4" alt="Logo microsoft" width="30" height="30"> | [**microsoft**](https://github.com/microsoft) | [**TypeScript-Website**](https://github.com/microsoft/TypeScript-Website) | **2256** | **1381** | **Performance improvement** |
| <img src="https://avatars.githubusercontent.com/u/751633?v=4" alt="Logo joomla" width="30" height="30"> | [joomla](https://github.com/joomla) | [accessibility](https://github.com/joomla/accessibility) | 8 | 12 | fix typos |
| <img src="https://avatars.githubusercontent.com/u/126906955?v=4" alt="Logo irdpl" width="30" height="30"> | [irdpl](https://github.com/irdpl) | [irdpl.github.io](https://github.com/irdpl/irdpl.github.io) | 0 | 1 | Accessibility improvements |
| <img src="https://avatars.githubusercontent.com/u/126906955?v=4" alt="Logo irdpl" width="30" height="30"> | [irdpl](https://github.com/irdpl) | [wcag](https://github.com/irdpl/wcag) | 7 | 2 | poprawki literówek |
| <img src="https://avatars.githubusercontent.com/u/16292300?v=4" alt="Logo pa11y" width="30" height="30"> | [pa11y](https://github.com/pa11y) | [pa11y.github.io](https://github.com/pa11y/pa11y.github.io) | 8 | 14 | Add Creative Commons image dimensions to markup to improve CLS |
| <img src="https://avatars.githubusercontent.com/u/51910064?v=4" alt="Logo simple-login" width="30" height="30"> | [simple-login](https://github.com/simple-login) | [website](https://github.com/simple-login/website) | 44 | 33 | SEO, Performance and Accessibility improvements |
| <img src="https://avatars.githubusercontent.com/u/51910064?v=4" alt="Logo simple-login" width="30" height="30"> | [simple-login](https://github.com/simple-login) | [website](https://github.com/simple-login/website) | 44 | 33 | Multilingual |
| <img src="https://avatars.githubusercontent.com/u/29385237?v=4" alt="Logo gohugoio" width="30" height="30"> | [gohugoio](https://github.com/gohugoio) | [hugoDocs](https://github.com/gohugoio/hugoDocs) | 1065 | 1506 | Update editors.md |
| <img src="https://avatars.githubusercontent.com/u/38217527?v=4" alt="Logo homebridge" width="30" height="30"> | [homebridge](https://github.com/homebridge) | [homebridge.io](https://github.com/homebridge/homebridge.io) | 9 | 5 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/42816656?v=4" alt="Logo swiftlang" width="30" height="30"> | [swiftlang](https://github.com/swiftlang) | [swift-org-website](https://github.com/swiftlang/swift-org-website) | 481 | 192 | SEO improvement |
| <img src="https://avatars.githubusercontent.com/u/4527441?v=4" alt="Logo alextselegidis" width="30" height="30"> | [alextselegidis](https://github.com/alextselegidis) | [easyappointments](https://github.com/alextselegidis/easyappointments) | 3413 | 1292 | Update Polish language |
| <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="Logo github" width="30" height="30"> | [github](https://github.com/github) | [government.github.com](https://github.com/github/government.github.com) | 1748 | 982 | Performance and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/13844975?v=4" alt="Logo home-assistant" width="30" height="30"> | [**home-assistant**](https://github.com/home-assistant) | [**home-assistant.io**](https://github.com/home-assistant/home-assistant.io) | **5284** | **7387** | **Accessibility and SEO improvements** |
| <img src="https://avatars.githubusercontent.com/u/1342004?v=4" alt="Logo google" width="30" height="30"> | [**google**](https://github.com/google) | [**certificate-transparency-community-site**](https://github.com/google/certificate-transparency-community-site) | **110** | **62** | **Performance improvement** |
| <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="Logo github" width="30" height="30"> | [github](https://github.com/github) | [training-kit](https://github.com/github/training-kit) | 4400 | 4366 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/13096?v=4" alt="Logo niw" width="30" height="30"> | [niw](https://github.com/niw) | [HapticKey](https://github.com/niw/HapticKey) | 1649 | 62 | Polish localization |
| <img src="https://avatars.githubusercontent.com/u/1294177?v=4" alt="Logo raspberrypi" width="30" height="30"> | [raspberrypi](https://github.com/raspberrypi) | [documentation](https://github.com/raspberrypi/documentation) | 5279 | 2016 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/50278?v=4" alt="Logo twitter" width="30" height="30"> | [**twitter**](https://github.com/twitter) | [**opensource-website**](https://github.com/twitter/opensource-website) | **3040** | **818** | **Performance, Accessibility and SEO improvements** |
| <img src="https://avatars.githubusercontent.com/u/47399700?v=4" alt="Logo instantpage" width="30" height="30"> | [instantpage](https://github.com/instantpage) | [instant.page-site](https://github.com/instantpage/instant.page-site) | 14 | 2 | Core Web Vitals Optimization |
| <img src="https://avatars.githubusercontent.com/u/131524?v=4" alt="Logo mozilla" width="30" height="30"> | [**mozilla**](https://github.com/mozilla) | [**webext-compat-tool**](https://github.com/mozilla/webext-compat-tool) | **13** | **19** | **Accessibility and SEO improvements** |
| <img src="https://avatars.githubusercontent.com/u/131524?v=4" alt="Logo mozilla" width="30" height="30"> | [**mozilla**](https://github.com/mozilla) | [**extension-workshop**](https://github.com/mozilla/extension-workshop) | **103** | **132** | **Text remains visible during webfont load** |
| <img src="https://avatars.githubusercontent.com/u/131524?v=4" alt="Logo mozilla" width="30" height="30"> | [**mozilla**](https://github.com/mozilla) | [**webext-compat-tool**](https://github.com/mozilla/webext-compat-tool) | **13** | **19** | **Accessibility and SEO improvements** |
| <img src="https://avatars.githubusercontent.com/u/6154722?v=4" alt="Logo microsoft" width="30" height="30"> | [**microsoft**](https://github.com/microsoft) | [**TypeScript-Website**](https://github.com/microsoft/TypeScript-Website) | **2256** | **1381** | **Links to cross-origin destinations are safe** |
| <img src="https://avatars.githubusercontent.com/u/1342004?v=4" alt="Logo google" width="30" height="30"> | [**google**](https://github.com/google) | [**docsy**](https://github.com/google/docsy) | **2646** | **912** | **Accessibility and SEO improvements** |
| <img src="https://avatars.githubusercontent.com/u/69631?v=4" alt="Logo facebook" width="30" height="30"> | [**facebook**](https://github.com/facebook) | [**metro**](https://github.com/facebook/metro) | **5271** | **631** | **Accessibility improvement** |
| <img src="https://avatars.githubusercontent.com/u/69631?v=4" alt="Logo facebook" width="30" height="30"> | [**facebook**](https://github.com/facebook) | [**react-native-website**](https://github.com/facebook/react-native-website) | **1973** | **4396** | **Accessibility improvement** |
| <img src="https://avatars.githubusercontent.com/u/46310316?v=4" alt="Logo gethugothemes" width="30" height="30"> | [gethugothemes](https://github.com/gethugothemes) | [dot-hugo](https://github.com/gethugothemes/dot-hugo) | 264 | 148 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/13369712?v=4" alt="Logo nanxiaobei" width="30" height="30"> | [nanxiaobei](https://github.com/nanxiaobei) | [hugo-paper](https://github.com/nanxiaobei/hugo-paper) | 2150 | 495 | Added i18n translation - Polish |
| <img src="https://avatars.githubusercontent.com/u/29385237?v=4" alt="Logo gohugoio" width="30" height="30"> | [gohugoio](https://github.com/gohugoio) | [hugoDocs](https://github.com/gohugoio/hugoDocs) | 1065 | 1506 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/31970254?v=4" alt="Logo GoogleChromeLabs" width="30" height="30"> | [GoogleChromeLabs](https://github.com/GoogleChromeLabs) | [quicklink](https://github.com/GoogleChromeLabs/quicklink) | 11056 | 406 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/31970254?v=4" alt="Logo GoogleChromeLabs" width="30" height="30"> | [GoogleChromeLabs](https://github.com/GoogleChromeLabs) | [quicklink](https://github.com/GoogleChromeLabs/quicklink) | 11056 | 406 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/73735083?v=4" alt="Logo hugo-toha" width="30" height="30"> | [hugo-toha](https://github.com/hugo-toha) | [toha](https://github.com/hugo-toha/toha) | 1063 | 617 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/46310316?v=4" alt="Logo gethugothemes" width="30" height="30"> | [gethugothemes](https://github.com/gethugothemes) | [bigspring-light-hugo](https://github.com/gethugothemes/bigspring-light-hugo) | 207 | 308 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/38368052?v=4" alt="Logo wangchucheng" width="30" height="30"> | [wangchucheng](https://github.com/wangchucheng) | [hugo-eureka](https://github.com/wangchucheng/hugo-eureka) | 928 | 193 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/38368052?v=4" alt="Logo wangchucheng" width="30" height="30"> | [wangchucheng](https://github.com/wangchucheng) | [hugo-eureka](https://github.com/wangchucheng/hugo-eureka) | 928 | 193 | add polish i18n support |
| <img src="https://avatars.githubusercontent.com/u/38368052?v=4" alt="Logo wangchucheng" width="30" height="30"> | [wangchucheng](https://github.com/wangchucheng) | [hugo-eureka](https://github.com/wangchucheng/hugo-eureka) | 928 | 193 | Accessibility improvements |
| <img src="https://avatars.githubusercontent.com/u/6154722?v=4" alt="Logo microsoft" width="30" height="30"> | [**microsoft**](https://github.com/microsoft) | [**vscode-loc**](https://github.com/microsoft/vscode-loc) | **579** | **302** | **fix typo** |
| <img src="https://avatars.githubusercontent.com/u/6861120?v=4" alt="Logo michalczukm" width="30" height="30"> | [michalczukm](https://github.com/michalczukm) | [michalczukm.xyz](https://github.com/michalczukm/michalczukm.xyz) | 0 | 1 | Accessibility improvements |
| <img src="https://avatars.githubusercontent.com/u/23409060?v=4" alt="Logo ojroques" width="30" height="30"> | [ojroques](https://github.com/ojroques) | [hugo-researcher](https://github.com/ojroques/hugo-researcher) | 235 | 130 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/830714?v=4" alt="Logo escalate" width="30" height="30"> | [escalate](https://github.com/escalate) | [hugo-split-theme](https://github.com/escalate/hugo-split-theme) | 76 | 89 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/1778935?v=4" alt="Logo GoogleChrome" width="30" height="30"> | [**GoogleChrome**](https://github.com/GoogleChrome) | [**workbox**](https://github.com/GoogleChrome/workbox) | **12425** | **823** | **Update README.md** |
| <img src="https://avatars.githubusercontent.com/u/1342004?v=4" alt="Logo google" width="30" height="30"> | [**google**](https://github.com/google) | [**certificate-transparency-community-site**](https://github.com/google/certificate-transparency-community-site) | **110** | **62** | **Accessibility and SEO improvements** |
| <img src="https://avatars.githubusercontent.com/u/170270?v=4" alt="Logo sindresorhus" width="30" height="30"> | [sindresorhus](https://github.com/sindresorhus) | [caprine](https://github.com/sindresorhus/caprine) | 7068 | 561 | Fix "Hide Names and Avatars" |
| <img src="https://avatars.githubusercontent.com/u/6154722?v=4" alt="Logo microsoft" width="30" height="30"> | [**microsoft**](https://github.com/microsoft) | [**TypeScript-Website-Localizations**](https://github.com/microsoft/TypeScript-Website-Localizations) | **118** | **132** | **fix typo** |
| <img src="https://avatars.githubusercontent.com/u/848102?v=4" alt="Logo nasa" width="30" height="30"> | [**nasa**](https://github.com/nasa) | [**instructions**](https://github.com/nasa/instructions) | **340** | **57** | **Improved accessibility, performance and SEO** |
| <img src="https://avatars.githubusercontent.com/u/1778935?v=4" alt="Logo GoogleChrome" width="30" height="30"> | [**GoogleChrome**](https://github.com/GoogleChrome) | [**developer.chrome.com**](https://github.com/GoogleChrome/developer.chrome.com) | **1662** | **1573** | **Accessibility improved** |
| <img src="https://avatars.githubusercontent.com/u/69102126?v=4" alt="Logo responsively-org" width="30" height="30"> | [responsively-org](https://github.com/responsively-org) | [website](https://github.com/responsively-org/website) | 23 | 47 | Reduces images file sizes |
| <img src="https://avatars.githubusercontent.com/u/69102126?v=4" alt="Logo responsively-org" width="30" height="30"> | [responsively-org](https://github.com/responsively-org) | [website](https://github.com/responsively-org/website) | 23 | 47 | Accessibility improved |
| <img src="https://avatars.githubusercontent.com/u/69102126?v=4" alt="Logo responsively-org" width="30" height="30"> | [responsively-org](https://github.com/responsively-org) | [responsively-app](https://github.com/responsively-org/responsively-app) | 22885 | 1206 | Add tooltip to icons on left panel |

<!-- CLOSED_PULL_REQUESTS_END -->

## Open Pull Requests
<!-- OPEN_PULL_REQUESTS_START -->
| Icon | User | Repository | Stars | Forks | Pull Request |
|:----|:----|:----|:----|:----|:----|
| <img src="https://avatars.githubusercontent.com/u/379216?v=4" alt="Logo w3c" width="30" height="30"> | [**w3c**](https://github.com/w3c) | [**wai-website**](https://github.com/w3c/wai-website) | **65** | **351** | **fix typos for Polish language** |
| <img src="https://avatars.githubusercontent.com/u/51910064?v=4" alt="Logo simple-login" width="30" height="30"> | [simple-login](https://github.com/simple-login) | [website](https://github.com/simple-login/website) | 44 | 33 | Added Polish translation |
| <img src="https://avatars.githubusercontent.com/u/53786759?v=4" alt="Logo govtech-polska" width="30" height="30"> | [govtech-polska](https://github.com/govtech-polska) | [fact_checking_portal](https://github.com/govtech-polska/fact_checking_portal) | 1 | 2 | Accessibility improvements |
| <img src="https://avatars.githubusercontent.com/u/9289019?v=4" alt="Logo letsencrypt" width="30" height="30"> | [letsencrypt](https://github.com/letsencrypt) | [website](https://github.com/letsencrypt/website) | 858 | 576 | Accessibility and SEO improvements |
| <img src="https://avatars.githubusercontent.com/u/35151645?v=4" alt="Logo iina" width="30" height="30"> | [iina](https://github.com/iina) | [iina-website](https://github.com/iina/iina-website) | 124 | 29 | Accessibility and SEO improvements |

<!-- OPEN_PULL_REQUESTS_END -->
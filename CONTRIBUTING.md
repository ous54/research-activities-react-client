# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Naming Convention

### Branch

- Include the work type: feature, refactor, bugfix, hotfix, etc.
- Include a short descriptive summary in imperative present tense

| Branch  |                                        |
| :------ | :------------------------------------- |
| feature | A feature branch                       |
| hotfix  | A Hotfix changes for production issues |
| bugfix  | A bugfix branch                        |
| chore   | cleaning up and organizing the code    |
| docs    | Documentations                         |

#### Suggested Format: `[work type]-[2-3 word summary]`

Example:

```git
git checkout -b feature-oauth
git checkout -b hotfix-notification-error
```

### Pull Request

Consists of two parts:

- Title: Short informative summary of the pull request
- Description: More detailed explanatory text describing the PR

#### Subject:

- Short and descriptive summary
- Should be capitalized and written in imperative present tense
- Not end with period

Suggested Format: [PR description]

Example:

```
Add Edit on Github button to all the pages
```

#### Description:

- Separated with a blank line from the subject
- Explain what, why, etc.
- Max 72 chars
- Each paragraph capitalized

### Issue

Suggested Format: `<type>: <description>`

`<type>` might be `feature`/`bug`/`chore`/`docs` etc

Example:

```
feature: add notification component
```

## Acknowledgements

- [namingconvention.org](https://github.com/naming-convention/naming-convention-guides)

### Commit Message

Consist of two parts:

- Subject: Short informative summary of the commit
- Body: More detailed explanatory text if needed

#### Subject:

- Short and descriptive (max 50 chars)
- Capitalized
- In imperative present tense
- Not end with period

Example:

```
Implement access right management
```

#### Body:

- Separated with a blank line from the subject
- Explain what, why, etc.
- Max 72 chars
- Each paragraph capitalized

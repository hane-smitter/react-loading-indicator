# How to run this project

`npm install`
`npm run storybook` - when in development
Create a tag if you want and push it to remote if you want to publish new version to NPM.
For pushing: `git config push.followTags true`

Workflow for the github actions is:
`tag-release.yml` will run when you push a new tag to repo. `tag-release.yml` will then create a new release which will trigger `publish-release.yml` to publish to NPM.

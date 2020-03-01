# Electron Typescript Start

## Stack

Electron app built with React, in TypeScript. It uses Jest for the test framework. Webpack to bundle. 

### Development

```bash
git clone https://github.com/jasonraimondi/traverse
cd traverse/
```

After you've cloned the repository.

```bash
npm install
npm run start
```

### Tests

Test framework is [Jest](https://jestjs.io/). Assertion library is [Chai](http://www.chaijs.com/api/assert/).

```bash
npm run test
# npm run test:watch # for running/watching
```

If you are using an IntelliJ IDE, you should see an option for 'Unit Tests' in the top righthand corner.

![IntelliJ Unit Test Runner](https://i.imgur.com/6nw5rvZ.png)

### Building

First you need to create a personal access token with the "repo" scope selected. Copy this access token, we are going to need to add it as `GH_TOKEN` in our [.env.sh](.env.sample.sh).

```bash
cp .env.sample.sh .env.sh
vim .env.sh
```

After you add your token, make sure the [package.json](./package.json) version is updated.

```bash
./publish.sh
```

### License

[MIT licensed](./LICENSE).

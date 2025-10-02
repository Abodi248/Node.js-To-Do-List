import scanner from 'sonarqube-scanner';

scanner.scan({
  serverUrl: 'http://localhost:9000',
  token: process.env.SONAR_TOKEN,
  options: {
    'sonar.projectKey': 'todo-app',
    'sonar.projectName': 'todo-app',
    'sonar.sources': '.', // base dir
    'sonar.inclusions': 'index.js', // your real code files
    'sonar.exclusions': 'node_modules/**,coverage/**,test/**,**/*.config.js',
    'sonar.coverage.exclusions': 'test/**,coverage/**,**/*.config.js', // keep test files out of coverage calc
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.sourceEncoding': 'UTF-8'
  }
}, () => process.exit());

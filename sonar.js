import scanner from 'sonarqube-scanner';

scanner.scan({
  serverUrl: 'http://localhost:9000',
  token: process.env.SONAR_TOKEN,
  options: {
    'sonar.projectKey': 'todo-app',
    'sonar.sources': '.',
    'sonar.exclusions': 'node_modules/**,coverage/**',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info'
  }
}, () => process.exit());

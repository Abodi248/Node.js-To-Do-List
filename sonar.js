import scanner from 'sonarqube-scanner';

scanner({
  serverUrl: 'http://localhost:9000',
  token: process.env.SONAR_TOKEN,
  options: {
    'sonar.projectKey': 'todo-app',
    'sonar.sources': '.'
  }
}, () => process.exit());

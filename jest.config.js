/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'], // optional, Jest infers .js from "type": "module"
  transform: {},
};

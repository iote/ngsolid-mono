module.exports = {
  name: 'external-ngfire-admin-data',
  preset: '../../../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../../coverage/libs/external/ngfire/admin-data',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};

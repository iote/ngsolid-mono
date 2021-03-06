module.exports = {
  name: '-external-ngfire-nest',
  preset: '../../../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../../coverage/libs//external/ngfire/nest',
  globals: {
    'ts-jest': { tsConfig: 'libs/external/ngfire/nest/tsconfig.spec.json' },
  },
};

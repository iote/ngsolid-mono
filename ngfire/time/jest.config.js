module.exports = {
  name: 'external-ngfire-time',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/external/ngfire/time',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

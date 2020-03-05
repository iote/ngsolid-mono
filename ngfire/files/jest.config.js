module.exports = {
  name: 'external-ngfire-files',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/external/ngfire/files',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

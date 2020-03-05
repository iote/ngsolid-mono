module.exports = {
  name: 'external-ngfire-angular',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/external/ngfire/angular',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

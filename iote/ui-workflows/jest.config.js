module.exports = {
  name: 'external-iote-ui-workflows',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/external/iote/ui-workflows',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

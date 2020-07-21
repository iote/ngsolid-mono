module.exports = {
  name: 'external-iote-bricks-angular',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/external/iote/bricks-angular',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

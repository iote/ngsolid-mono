# Add below snippets to nx.json upon install of libs/external
"@iote/bricks": {
  "tags": []
},
"@ngfire/firestore-qbuilder": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks"]
},
"@iote/bricks-angular": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks"]
},
"@ngfire/angular": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks", "@iote/bricks-angular", "@ngfire/firestore-qbuilder"]
},
"@ngfire/time": {
  "tags": [],
  "implicitDependencies": ["@ngfire/firestore-qbuilder"]
},
"@ngfire/files": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks"]
},
"@iote/ui-workflows": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks-angular"]
}

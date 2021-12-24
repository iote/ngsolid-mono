# Add below snippets to nx.json upon install of libs/external
````javascript
"@iote/bricks": {
  "tags": []
},
"@ngfi/firestore-qbuilder": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks"]
},
"@iote/bricks-angular": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks"]
},
"@ngfi/angular": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks", "@iote/bricks-angular", "@ngfi/firestore-qbuilder"]
},
"@ngfi/time": {
  "tags": [],
  "implicitDependencies": ["@ngfi/firestore-qbuilder"]
},
"@ngfire/files": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks"]
},
"@iote/ui-workflows": {
  "tags": [],
  "implicitDependencies": ["@iote/bricks-angular"]
}
````

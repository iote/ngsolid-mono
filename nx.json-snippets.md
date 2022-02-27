# Add below snippets to nx.json upon install of libs/external
````javascript
"@s4y/external/iote/bricks": {
  "tags": []
},
"@s4y/external/ngfire/firestore-qbuilder": {
  "tags": [],
  "implicitDependencies": ["@s4y/external/iote/bricks"]
},
"@s4y/external/iote/bricks-angular": {
  "tags": [],
  "implicitDependencies": ["@s4y/external/iote/bricks"]
},
"@s4y/external/ngfire/angular": {
  "tags": [],
  "implicitDependencies": ["@s4y/external/iote/bricks", "@s4y/external/iote/bricks-angular", "@s4y/external/ngfire/firestore-qbuilder"]
},
"@s4y/external/ngfire/time": {
  "tags": [],
  "implicitDependencies": ["@s4y/external/ngfire/firestore-qbuilder"]
},
"@ngfire/files": {
  "tags": [],
  "implicitDependencies": ["@s4y/external/iote/bricks"]
},
"@s4y/external/iote/ui-workflows": {
  "tags": [],
  "implicitDependencies": ["@s4y/external/iote/bricks-angular"]
}
````

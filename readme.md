# Installation instructions NgSolid inside of an NX project

All commands should be executed from root of parent NX project

## 1. Create all libraries using CLI

### 1.1. Node Libraries

```
ng g @nrwl/node:lib external/iote/bricks   
ng g @nrwl/node:lib external/ngfire/firestore-qbuilder   
```

### 1.2. Angular Libraries (always pick scss)

```
ng g @nrwl/angular:lib external/iote/bricks-angular
ng g @nrwl/angular:lib external/iote/ui-workflows

ng g @nrwl/angular:lib external/ngfire/angular
ng g @nrwl/angular:lib external/ngfire/files
ng g @nrwl/angular:lib external/ngfire/time
```

<i>TODO</i>
<i>-- ng g @nrwl/node:lib external/ngfire/functions <b>(not yet supported)</b></i>

## 2. Delete everything below libs/external

````
rm -r libs/external
````

## 3. Add git submodule and move into external.

````
git submodule add https://github.com/iote/ngsolid-mono
git mv ngsolid-mono libs/external
````
Result should be a folder structure under external which is the same as before 
<i>(this can sometimes need a couple more git mv's. Important though, never move this folder manually!)</i>

## 4. Link up libraries
### INSTALL NX PROPERLY USING THE PEER SNIPPETS
Swap out pathNames

<b>In NX root tsconfig.json</b>
````javascript
"@proj-name/external/iote/analytics": [ "libs/external/iote/analytics/src/index.ts" ],
"@proj-name/external/iote/bricks": [ "libs/external/iote/bricks/src/index.ts" ],
"@proj-name/external/ngfire/firestore-qbuilder": [ "libs/external/ngfire/firestore-qbuilder/src/index.ts" ],
"@proj-name/external/iote/bricks-angular": [ "libs/external/iote/bricks-angular/src/index.ts" ],
"@proj-name/external/ngfire/angular": [ "libs/external/ngfire/angular/src/index.ts" ],
"@proj-name/external/ngfire/time": [ "libs/external/ngfire/time/src/index.ts" ],
"@proj-name/external/ngfire/files": [ "libs/external/ngfire/files/src/index.ts" ],
"@proj-name/external/iote/ui-workflows": [ "libs/external/iote/ui-workflows/src/index.ts" ]
````

Change into
````javascript
"@iote/analytics": [ "libs/external/iote/analytics/src/index.ts" ],
"@iote/bricks": [ "libs/external/iote/bricks/src/index.ts" ],
"@iote/bricks-angular": [ "libs/external/iote/bricks-angular/src/index.ts" ],
"@iote/ui-workflows": [ "libs/external/iote/ui-workflows/src/index.ts" ],
"@ngfi/firestore-qbuilder": [ "libs/external/ngfire/firestore-qbuilder/src/index.ts" ],
"@ngfi/angular": [ "libs/external/ngfire/angular/src/index.ts" ],
"@ngfi/time": [ "libs/external/ngfire/time/src/index.ts" ],
"@ngfire/files": [ "libs/external/ngfire/files/src/index.ts" ]
````

<b>PRO TIP:</b> By playing with this paths array, you can create as many namespaces for your libraries as you wish.

## 5. Angular Namespaces

In NX root angular.json, look for "prefix": "project-name-new",

CTRL+F and change this prefix-value to "iote" or "ngfire" depending on the lib. (only for external deps)

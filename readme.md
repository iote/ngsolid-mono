# Installation instructions NgSolid inside of an NX project

All commands should be executed from root of parent NX project

## 1. Create all libraries using CLI

### 1.1. Node Libraries

> ng g @nrwl/node:lib external/iote/bricks   

> ng g @nrwl/node:lib external/ngfire/firestore-qbuilder   

### 1.2. Angular Libraries (always pick scss)

> ng g @nrwl/angular:lib external/iote/bricks-angular
> ng g @nrwl/angular:lib external/iote/ui-workflows

> ng g @nrwl/angular:lib external/ngfire/angular
> ng g @nrwl/angular:lib external/ngfire/files
> ng g @nrwl/angular:lib external/ngfire/time


TODO
-- ng g @nrwl/node:lib external/ngfire/functions (not yet supported)


## 2. Delete everything below libs/external

## 3. Add git submodule and move into external.

> git submodule add https://github.com/iote/ngsolid-mono
> git mv ngsolid-mono libs/external

Result should be a folder structure under external which is the same as before.




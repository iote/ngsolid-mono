# Add below snippets to angular.json upon install of libs/external
````
"@iote/bricks": {
  "root": "libs/external/iote/bricks",
  "sourceRoot": "libs/external/iote/bricks/src",
  "projectType": "library",
  "schematics": {},
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/iote/bricks/tsconfig.lib.json",
          "libs/external/iote/bricks/tsconfig.spec.json"
        ],
        "exclude": ["**/node_modules/**", "!libs/external/iote/bricks/**"]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/iote/bricks/jest.config.js",
        "tsConfig": "libs/external/iote/bricks/tsconfig.spec.json",
        "passWithNoTests": true
      }
    }
  }
},
"@iote/bricks-angular": {
  "projectType": "library",
  "root": "libs/external/iote/bricks-angular",
  "sourceRoot": "libs/external/iote/bricks-angular/src",
  "prefix": "iote",
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/iote/bricks-angular/tsconfig.lib.json",
          "libs/external/iote/bricks-angular/tsconfig.spec.json"
        ],
        "exclude": [
          "**/node_modules/**",
          "!libs/external/iote/bricks-angular/**"
        ]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/iote/bricks-angular/jest.config.js",
        "tsConfig": "libs/external/iote/bricks-angular/tsconfig.spec.json",
        "passWithNoTests": true,
        "setupFile": "libs/external/iote/bricks-angular/src/test-setup.ts"
      }
    }
  },
  "schematics": {
    "@nrwl/angular:component": {
      "styleext": "scss"
    }
  }
},
"@ngfi/angular": {
  "projectType": "library",
  "root": "libs/external/ngfire/angular",
  "sourceRoot": "libs/external/ngfire/angular/src",
  "prefix": "ngfire",
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/ngfire/angular/tsconfig.lib.json",
          "libs/external/ngfire/angular/tsconfig.spec.json"
        ],
        "exclude": [
          "**/node_modules/**",
          "!libs/external/ngfire/angular/**"
        ]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/ngfire/angular/jest.config.js",
        "tsConfig": "libs/external/ngfire/angular/tsconfig.spec.json",
        "passWithNoTests": true,
        "setupFile": "libs/external/ngfire/angular/src/test-setup.ts"
      }
    }
  },
  "schematics": {
    "@nrwl/angular:component": {
      "styleext": "scss"
    }
  }
},
"@ngfi/time": {
  "projectType": "library",
  "root": "libs/external/ngfire/time",
  "sourceRoot": "libs/external/ngfire/time/src",
  "prefix": "ngfire",
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/ngfire/time/tsconfig.lib.json",
          "libs/external/ngfire/time/tsconfig.spec.json"
        ],
        "exclude": ["**/node_modules/**", "!libs/external/ngfire/time/**"]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/ngfire/time/jest.config.js",
        "tsConfig": "libs/external/ngfire/time/tsconfig.spec.json",
        "passWithNoTests": true,
        "setupFile": "libs/external/ngfire/time/src/test-setup.ts"
      }
    }
  },
  "schematics": {
    "@nrwl/angular:component": {
      "styleext": "scss"
    }
  }
},
"@ngfire/files": {
  "projectType": "library",
  "root": "libs/external/ngfire/files",
  "sourceRoot": "libs/external/ngfire/files/src",
  "prefix": "ngfire",
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/ngfire/files/tsconfig.lib.json",
          "libs/external/ngfire/files/tsconfig.spec.json"
        ],
        "exclude": ["**/node_modules/**", "!libs/external/ngfire/files/**"]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/ngfire/files/jest.config.js",
        "tsConfig": "libs/external/ngfire/files/tsconfig.spec.json",
        "passWithNoTests": true,
        "setupFile": "libs/external/ngfire/files/src/test-setup.ts"
      }
    }
  },
  "schematics": {
    "@nrwl/angular:component": {
      "styleext": "scss"
    }
  }
},
"@ngfi/firestore-qbuilder": {
  "projectType": "library",
  "root": "libs/external/ngfire/firestore-qbuilder",
  "sourceRoot": "libs/external/ngfire/firestore-qbuilder/src",
  "prefix": "ngfire",
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/ngfire/firestore-qbuilder/tsconfig.lib.json",
          "libs/external/ngfire/firestore-qbuilder/tsconfig.spec.json"
        ],
        "exclude": [
          "**/node_modules/**",
          "!libs/external/ngfire/firestore-qbuilder/**"
        ]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/ngfire/firestore-qbuilder/jest.config.js",
        "tsConfig": "libs/external/ngfire/firestore-qbuilder/tsconfig.spec.json",
        "passWithNoTests": true,
        "setupFile": "libs/external/ngfire/firestore-qbuilder/src/test-setup.ts"
      }
    }
  },
  "schematics": {
    "@nrwl/angular:component": {
      "styleext": "scss"
    }
  }
},
"@iote/ui-workflows": {
  "projectType": "library",
  "root": "libs/external/iote/ui-workflows",
  "sourceRoot": "libs/external/iote/ui-workflows/src",
  "prefix": "ngfire",
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/iote/ui-workflows/tsconfig.lib.json",
          "libs/external/iote/ui-workflows/tsconfig.spec.json"
        ],
        "exclude": [
          "**/node_modules/**",
          "!libs/external/iote/ui-workflows/**"
        ]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/iote/ui-workflows/jest.config.js",
        "tsConfig": "libs/external/iote/ui-workflows/tsconfig.spec.json",
        "passWithNoTests": true,
        "setupFile": "libs/external/iote/ui-workflows/src/test-setup.ts"
      }
    }
  },
  "schematics": {
    "@nrwl/angular:component": {
      "styleext": "scss"
    }
  }
},
"@iote/cqrs": {
  "root": "libs/external/iote/cqrs",
  "sourceRoot": "libs/external/iote/cqrs/src",
  "projectType": "library",
  "schematics": {},
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/iote/cqrs/tsconfig.lib.json",
          "libs/external/iote/cqrs/tsconfig.spec.json"
        ],
        "exclude": ["**/node_modules/**", "!libs/external/iote/cqrs/**"]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/iote/cqrs/jest.config.js",
        "tsConfig": "libs/external/iote/cqrs/tsconfig.spec.json",
        "passWithNoTests": true
      }
    }
  }
},
"@ngfi/admin-data": {
  "root": "libs/external/ngfire/admin-data",
  "sourceRoot": "libs/external/ngfire/admin-data/src",
  "projectType": "library",
  "schematics": {},
  "architect": {
    "lint": {
      "builder": "@angular-devkit/build-angular:tslint",
      "options": {
        "tsConfig": [
          "libs/external/ngfire/admin-data/tsconfig.lib.json",
          "libs/external/ngfire/admin-data/tsconfig.spec.json"
        ],
        "exclude": [
          "**/node_modules/**",
          "!libs/external/ngfire/admin-data/**"
        ]
      }
    },
    "test": {
      "builder": "@nrwl/jest:jest",
      "options": {
        "jestConfig": "libs/external/ngfire/admin-data/jest.config.js",
        "tsConfig": "libs/external/ngfire/admin-data/tsconfig.spec.json",
        "passWithNoTests": true
      }
    }
  }
},
````

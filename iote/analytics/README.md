# @iote/analytics

Angular library for segment analytics.

## Set Up

After Installing this library, in your `environment.ts` file add segment key you can find it on [https://app.segment.com/](https://app.segment.com/):

```json

export const environment = {
        production: false,
        segment: '<ADD segment key here or leave an empty string'
    };

```

Then in your applications `app.moduke.ts` import the `AnalytcsModule`. If you are running the application in production you can set `debug` to **false**.

```typescript


import { AnalyticsModule } from '<projectname>/external/iote/analytics';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AnalyticsModule.forRoot({ apiKey: environment.segment, debug: true, loadOnInitialization: true }),
    ...
  ]
})

```

To confirm that segment has been properly run the application inspect logs on the browser you should see that segment has been initialized.

```markdown
  Segment initialization...             segment.service.ts:45
  Segment initialized                   segment.service.ts:115
```

## Tracking Pages

To track a page all you need is to extend the `PageTracker` component found in `@iote/analytics/src/lib/components/PageTracker/PageTracker.component.ts`

**Example tracking login page**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomComponent } from './CustomDecorator';
import { PageTracker } from 'path/to/file';

...

@CustomComponent({
  selector: 'app-login',
  templateUrl: './login.component.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends PageTracker implements OnInit, OnDestroy   {

  constructor() {
    super(); // must call super
  }

  // Add new logic here!
}

// if you added the life cycle hooks you must call super for each one of them as shown below
ngOnInit(){
  super.ngOnInit()
}



ngOnDestroy(){
  super.ngOnDestroy()
}
```

# Tracking Events

We use the `@Log()` decorator found in `@iote/analytics/src/lib/decorators/analytics/decorator.ts`

**Example usage in log in page user clicked log in button**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Log } from '@my-app/utils/iote/analytics';
import { CustomComponent } from './CustomDecorator';
import { PageTracker } from 'path/to/file';

...

@CustomComponent({
  selector: 'app-login',
  templateUrl: './login.component.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends PageTracker implements OnInit, OnDestroy   {

  constructor() {
    super(); // must call super
  }

  // Add new logic here!
}

// if you added the life cycle hooks you must call super for each one of them as shown below
ngOnInit(){
  super.ngOnInit()
}

  @Log({name:'LoginComponent.UserLogin', accType: 'email', function: 'loginUser', componentName: 'Login'})
  loginUser() {
  }



ngOnDestroy(){
  super.ngOnDestroy()
}
```

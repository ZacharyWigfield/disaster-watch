# DisasterWatch

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Best Practices from the Angular Team 

## Typescript Best Practices
*Use strict type checking <br />
*Prefer type inference when the type is obvious <br />
*Avoid the any type; use unknown when type is uncertain <br />
## Angular Best Practices
*Always use standalone components over NgModules <br />
*Don't use explicit standalone: true (it is implied by default) <br />
*Use signals for state management <br />
*Implement lazy loading for feature routes <br />
*Use NgOptimizedImage for all static images. <br />

 ## Components
*Keep components small and focused on a single responsibility <br />
*Use input() and output() functions instead of decorators <br />
*Use computed() for derived state <br />
*Set changeDetection: ChangeDetectionStrategy.OnPush in @Component decorator <br />
*Prefer inline templates for small components <br />
*Prefer Reactive forms instead of   Template-driven ones <br />
*Do NOT use ngClass, use class bindings instead <br />
*DO NOT use ngStyle, use style bindings instead 
## State Management 
*Use signals for local component state <br />
*Use computed() for derived state <br />
*Keep state transformations pure and predictable 
## Templates
*Keep templates simple and avoid complex logic <br />
*Use native control flow (@if, @for, @switch) instead of *ngIf, *ngFor, *ngSwitch <br />
*Use the async pipe to handle observables <br />
## Services
*Design services around a single responsibility <br />
*Use the providedIn: 'root' option for singleton services <br />
*Use the inject() function instead of constructor injection <br />
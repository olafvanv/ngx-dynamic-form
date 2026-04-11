# Dynamic Form Workspace

This repository is an Angular workspace that contains the `ngx-dynamic-form` library and a sandbox application for testing and development.

## `ngx-dynamic-form` Library

`ngx-dynamic-form` is a powerful Angular library designed to render data-driven Reactive Forms from a JSON-like configuration model. It simplifies the process of creating complex, dynamic forms by allowing developers to define form structures, validations, and interconnecting field dependencies (relations) systematically without writing extensive manual template code.

### Key Features

- **JSON-based Configuration**: Define form fields via a flat configuration array. Layout is decoupled and configured separately via a dedicated `layout` input.
- **Flexible CSS Grid Layout**: Control which fields appear on the same row and their relative widths — independently of the field configuration — using a simple string array and CSS custom properties.
- **Angular Material Integration**: Comes with pre-built, aesthetically pleasing form controls (Input, Select, Checkbox, Textarea, Datepicker, Button toggles, etc.) powered by Angular Material.
- **Dynamic Relations**: Built-in support for conditional rendering and state changes (e.g., hiding a field or making it disabled based on the value of another field).
- **Custom Controls**: Designed to be extensible so you can easily plug in your own custom form control components.
- **Built-in & Custom Validators**: Seamlessly apply validation logic directly in the configuration model.

For detailed documentation, usage instructions, and examples on how to consume the library, please refer to the specific library README located at [`projects/ngx-dynamic-form/README.md`](./projects/ngx-dynamic-form/README.md).

---

## Developer Instructions

This workspace contains two main projects:

1. **`ngx-dynamic-form`**: The actual library.
2. **`dynamic-form`**: A demo/sandbox application to test the library.

### Development Server

To start the demo application:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files in the app or the library.

### Building the Library

To build the `ngx-dynamic-form` library for production:

```bash
npm run lib:build
```

The build artifacts will be stored in the `dist/ngx-dynamic-form` directory.

To build the library in watch mode (useful when actively developing the library and testing it in the demo app):

```bash
npm run lib:watch
```

### Running Tests

To execute the unit tests via [Karma](https://karma-runner.github.io):

```bash
npm test
```

### Linting

To run the linter on the workspace:

```bash
npm run lint
```

To automatically fix linting errors:

```bash
npm run lint:fix
```

### Releasing

To build and publish the library to npm:

```bash
npm run lib:release
```

Note: Ensure you have the appropriate npm registry permissions and have bumped the version in `projects/ngx-dynamic-form/package.json` before running the release script.

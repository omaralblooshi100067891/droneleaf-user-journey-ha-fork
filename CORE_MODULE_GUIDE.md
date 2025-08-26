# Core Module Development Guide

## Overview

The Core Module uses a modular approach that allows frontend developers to easily add components, directives, pipes, and providers without modifying the main core module file. This guide explains how to use the contributed system.

## File Structure

- **`core.module.ts`** - Main core module file (DO NOT MODIFY)
- **`core.module.contributed.ts`** - Your contribution file (ADD YOUR COMPONENTS HERE)

## How It Works

The core module imports arrays from `core.module.contributed.ts` and uses them in the `@NgModule` decorator. This separation allows you to add your custom components without conflicts when copying the core module to other projects.

## Step-by-Step Guide

### 1. Create Your Component

First, create your component in the appropriate directory under `src/app/core/components/`:

```bash
# Example: Creating a new card component
ng generate component core/components/card
```

### 2. Add to Core Contributed File

Open `src/app/core/core.module.contributed.ts` and follow these steps:

#### Step A: Import Your Component

```typescript
// Add your import at the top
import { CardComponent } from "./components/card/card.component";
```

#### Step B: Add to CORE_CONTRIB_DECLARATIONS

```typescript
export const CORE_CONTRIB_DECLARATIONS: Type<any>[] = [
  // Existing components...
  InputComponent,
  ButtonComponent,
  // Add your component here
  CardComponent,
];
```

#### Step C: Add to CORE_CONTRIB_EXPORTS (if you want it available outside CoreModule)

```typescript
export const CORE_CONTRIB_EXPORTS: any[] = [
  // Existing components...
  InputComponent,
  ButtonComponent,
  // Add your component here
  CardComponent,
];
```

#### Step D: Add Required Imports (if your component needs external modules)

```typescript
export const CORE_CONTRIB_IMPORTS: any[] = [
  // Example: If your component needs HttpClientModule
  // HttpClientModule,
  // MatDialogModule,
];
```

#### Step E: Add Providers (if your component has services)

```typescript
export const CORE_CONTRIB_PROVIDERS: Provider[] = [
  // Example: If your component provides a service
  // { provide: CardService, useClass: CardService },
];
```

### 3. Use Your Component

Once added to the core module, your component is available throughout the application:

```html
<!-- In any template where CoreModule is imported -->
<app-card title="My Card" content="Card content"></app-card>
```

## Complete Example

Let's say you want to add a `LoaderComponent`:

### 1. Create the component:

```bash
ng generate component core/components/loader
```

### 2. Update `core.module.contributed.ts`:

```typescript
// 1. Import your component
import { LoaderComponent } from "./components/loader/loader.component";

// 2. Add to declarations
export const CORE_CONTRIB_DECLARATIONS: Type<any>[] = [
  InputComponent,
  ButtonComponent,
  TextInputComponent,
  SelectInputComponent,
  PhoneInputComponent,
  ToastComponent,
  HelpButtonComponent,
  ConfirmCancelModelComponent,
  LoaderComponent, // ← Add here
];

// 3. Add to exports (if needed outside CoreModule)
export const CORE_CONTRIB_EXPORTS: any[] = [
  InputComponent,
  ButtonComponent,
  TextInputComponent,
  SelectInputComponent,
  PhoneInputComponent,
  ToastComponent,
  HelpButtonComponent,
  ConfirmCancelModelComponent,
  LoaderComponent, // ← Add here
];

// 4. Add imports if needed (example: if loader uses animations)
export const CORE_CONTRIB_IMPORTS: any[] = [
  // BrowserAnimationsModule  // ← Add if needed
];

// 5. Add providers if needed
export const CORE_CONTRIB_PROVIDERS: Provider[] = [
  // { provide: LoaderService, useClass: LoaderService }  // ← Add if needed
];
```

### 3. Use anywhere in your app:

```html
<app-loader [isLoading]="true" message="Loading..."></app-loader>
```

## Troubleshooting

### Common Issues

1. **Component not found error**

   - Make sure you added it to `CORE_CONTRIB_DECLARATIONS`
   - Check that the import path is correct

2. **Module dependency error**

   - Add required modules to `CORE_CONTRIB_IMPORTS`
   - Make sure external dependencies are installed

3. **Service injection error**
   - Add the service to `CORE_CONTRIB_PROVIDERS`
   - Make sure the service is properly decorated with `@Injectable()`

### Getting Help

If you encounter issues:

1. Check the existing components in `core.module.contributed.ts` for examples
2. Verify your component works independently first
3. Check the browser console for detailed error messages
4. Review Angular documentation for module configuration

## Summary

The contributed system makes it easy to extend the CoreModule:

1. Create your component
2. Add imports and configuration to `core.module.contributed.ts`
3. Use your component anywhere in the app

This approach keeps the core module clean, maintainable, and easily portable between projects.

# Widgets & Component Registry System

This project uses a codegen-based dependency injection system for UI widgets. Follow these steps to add or update widgets:

## How to Add a New Widget

1. **Create a Widget Folder**
   - Add a new folder under `src/widgets/` with the widget name (e.g., `hero`).

2. **Create the Component**
   - In your widget folder, create a `component.tsx` file.
   - Export your React component as the default export.
   - Example:
     ```tsx
     // src/widgets/hero/component.tsx
     export { default } from "react-components/src/sections/Hero";
     ```

3. **(Optional) Create the Transformer**
   - If your widget needs prop transformation, create a `transformer.ts` file in the same folder.
   - Export a default function that receives props and returns transformed props.
   - **Basic identity transformer example:**
     ```ts
     // src/widgets/hero/transformer.ts
     const transformer = (props: any) => props;
     export default transformer;
     ```
   - **Custom transformer example:**
     ```ts
     // src/widgets/hero/transformer.ts
     // This transformer adds a default title if not provided
     const transformer = (props: any) => ({
       ...props,
       title: props.title || "Default Hero Title"
     });
     export default transformer;
     ```
   - If `transformer.ts` does not exist, the widget will be registered without a transformer.

4. **(Optional) Custom Registration**
   - If you need custom registration logic, add a `register.ts` file in your widget folder.
   - Export a default function that receives the `componentRegistry` as its first argument and performs registration as needed.
   - **Custom registration example:**
     ```ts
     // src/widgets/hero/register.ts
     export default function register(componentRegistry) {
       // Register with a custom key and extra options
       componentRegistry.registerComponent("hero-custom", {
         Component: require("./component").default,
         transformer: require("./transformer").default,
         customOption: true
       });
     }
     ```
   - If `register.ts` exists, it will be used instead of the default registration.

5. **(Optional) Add More Files**
   - You can add more files (e.g., `transformer.legacy.ts`) as needed for your widget.

## How to Register Widgets

- The registration is handled automatically by the codegen script. You do **not** need to manually edit the registry.
- The script scans all folders in `src/widgets/` and updates `src/globals/componentRegistry.codegen.ts` with the correct imports and registration calls.
- If a widget folder contains a `register.ts`, it will be used for registration. If not, the script will register the component (and transformer, if present) automatically.
- If `transformer.ts` is missing, the widget will be registered without a transformer.
- **Note:** The codegen script is AI-generated and may need review for your specific needs.

## How to Run the Codegen Script

- Run the following command in the `apps/new-web` directory:
  ```sh
  pnpm run codegen:components
  ```
- This will update the registry file. Commit the changes to `src/globals/componentRegistry.codegen.ts`.

## How to Use a Widget in Your App


## Notes
- The global container is defined in `src/globals/container.ts`.
- The registry logic is in `src/globals/containerRegistry.ts`.
- The codegen script is in `scripts/generateComponentRegistry.js`.
- The registry file to commit is `src/globals/componentRegistry.codegen.ts`.

---

**Summary:**
- Add a folder in `src/widgets/` with `component.tsx` and optionally `transformer.ts` and `register.ts`.
- Run the codegen script.
- Use the registry in your app.

For questions, see the code comments or ask the maintainers.

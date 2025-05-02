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
     export { default } from "../../../../../shared/react-components/src/sections/Hero";
     ```

3. **Create the Transformer**
   - In the same folder, create a `transformer.ts` file.
   - Export a default function that receives props and returns transformed props. For most cases, you can start with an identity function:
     ```ts
     // src/widgets/hero/transformer.ts
     const transformer = (props: any) => props;
     export default transformer;
     ```

4. **(Optional) Add More Files**
   - You can add more files (e.g., `transformer.legacy.ts`) as needed for your widget.

## How to Register Widgets

- The registration is handled automatically by the codegen script. You do **not** need to manually edit the registry.
- The script scans all folders in `src/widgets/` and updates `src/globals/componentRegistry.codegen.ts` with the correct imports and registration calls.

## How to Run the Codegen Script

- Run the following command in the `apps/new-web` directory:
  ```sh
  pnpm run codegen:components
  ```
- This will update the registry file. Commit the changes to `src/globals/componentRegistry.codegen.ts`.

## How to Use a Widget in Your App

- Import the registry and get the container for your widget:
  ```ts
  import { componentRegistry } from "@/globals/componentRegistry";
  const heroContainer = componentRegistry.get("hero");
  const heroFactory = heroContainer?.get("Component");
  const HeroComponent = heroFactory ? heroFactory(props) : null;
  ```

## Notes
- The global container is defined in `src/globals/container.ts`.
- The registry logic is in `src/globals/containerRegistry.ts`.
- The codegen script is in `scripts/generateComponentRegistry.js`.
- The registry file to commit is `src/globals/componentRegistry.codegen.ts`.

---

**Summary:**
- Add a folder in `src/widgets/` with `component.tsx` and `transformer.ts`.
- Run the codegen script.
- Use the registry in your app.

For questions, see the code comments or ask the maintainers.

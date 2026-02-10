// TODO: This code is AI generated. Review for custom needs.
import fs from "fs";
import path from "path";

const widgetsDir = path.join(path.dirname(import.meta.url.replace("file://", "")), "../src/widgets");
const registryFile = path.join(path.dirname(import.meta.url.replace("file://", "")), "../src/globals/componentRegistry.codegen.ts");

let content = "";
if (fs.existsSync(registryFile)) {
  content = fs.readFileSync(registryFile, "utf-8");
} else {
  content = `import { continerRegistry as componentRegistry } from "./componentRegistry";

export {
  componentRegistry
}

// --- codegen:registerComponents ---
`;
}

const marker = "// --- codegen:registerComponents ---";
const markerIndex = content.indexOf(marker);
if (markerIndex === -1) {
  throw new Error("Marker not found in componentRegistry.codegen.ts");
}

const widgets = fs.readdirSync(widgetsDir).filter(f =>
  fs.statSync(path.join(widgetsDir, f)).isDirectory()
);

let importLines = "";
let registerLines = "";

widgets.forEach(widget => {
  const widgetDir = path.join(widgetsDir, widget);
  const compImport = `import ${widget}Component from \"@/widgets/${widget}/component\";\n`;
  importLines += compImport;

  const transformerPath = path.join(widgetDir, "transformer.ts");
  const hasTransformer = fs.existsSync(transformerPath);
  if (hasTransformer) {
    importLines += `import ${widget}Transformer from \"@/widgets/${widget}/transformer\";\n`;
  }

  const registerPath = path.join(widgetDir, "register.ts");
  const hasRegister = fs.existsSync(registerPath);
  if (hasRegister) {
    importLines += `import ${widget}Register from \"@/widgets/${widget}/register\";\n`;
    registerLines += `${widget}Register(componentRegistry);\n`;
  } else {
    if (hasTransformer) {
      registerLines += `componentRegistry.registerComponent(\"${widget}\", { Component: ${widget}Component, transformer: ${widget}Transformer });\n`;
    } else {
      registerLines += `componentRegistry.registerComponent(\"${widget}\", { Component: ${widget}Component });\n`;
    }
  }
});

const beforeMarker = content.slice(0, markerIndex + marker.length);
const afterMarker = content.slice(markerIndex + marker.length);
const cleanedAfterMarker = afterMarker.replace(/(?:import .*?;\n|componentRegistry\.registerComponent\(.*?\);\n|.*Register\(componentRegistry\);\n)*/g, "");

const newContent = `${beforeMarker}\n${importLines}\n${registerLines}\n${cleanedAfterMarker}`;
fs.writeFileSync(registryFile, newContent);

console.log("Component registry codegen complete.");

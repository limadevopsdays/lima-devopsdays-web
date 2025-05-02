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
  const compImport = `import ${widget}Component from \"@/widgets/${widget}/component\";\n`;
  const transImport = `import ${widget}Transformer from \"@/widgets/${widget}/transformer\";\n`;
  importLines += compImport + transImport;
  registerLines += `componentRegistry.registerComponent(\"${widget}\", { Component: ${widget}Component, transformer: ${widget}Transformer });\n`;
});


const beforeMarker = content.slice(0, markerIndex + marker.length);
const afterMarker = content.slice(markerIndex + marker.length);
const cleanedAfterMarker = afterMarker.replace(/(?:import .*?;\n|componentRegistry\.registerComponent\(.*?\);\n)*/g, "");

const newContent = `${beforeMarker}\n${importLines}\n${registerLines}\n${cleanedAfterMarker}`;
fs.writeFileSync(registryFile, newContent);

console.log("Component registry codegen complete.");

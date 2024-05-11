const fs = require("fs");
const rimraf = require("rimraf");

if (fs.existsSync("dist")) {
    rimraf.sync("dist");
    console.log("dist folder cleaned");
}

// Opsional: Juga hapus node_modules
if (fs.existsSync("node_modules")) {
    rimraf.sync("node_modules");
    console.log("node_modules folder cleaned");
}

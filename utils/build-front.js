const { spawn, exec } = require("child_process");
const { promisify } = require("util");

const asyncExec = promisify(exec);

let isRunning = false;
let build = null;

function generateFront() {
  isRunning = true;
  let buildFront = spawn("yarn", ["build"], {
    cwd: "./static-site",
  });

  buildFront.on("close", (code, signal) => {
    isRunning = false;
    if (signal) {
      console.log(
        `child process terminated due to receipt of signal ${signal}`
      );
    }
    console.log(`child process exited with code ${code}`);
  });

  buildFront.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  buildFront.stderr.on("data", (data) => {
    console.log(`${data}`);
  });

  return buildFront;
}

function buildFront() {
  if (build && isRunning) {
    build.kill("SIGHUP");
    build = generateFront();
  } else {
    build = generateFront();
  }
}

async function cleanFolder(path) {
  try {
    await asyncExec(`rm -rf ${path}`);
  } catch (err) {
    console.error(`Could not clean ${path}`);
  }
}

function cleanBuild() {
  return Promise.all([
    cleanFolder("./static-site/.cache"),
    cleanFolder("./static-site/public"),
  ]);
}

module.exports = {
  buildFront,
  cleanBuild,
};

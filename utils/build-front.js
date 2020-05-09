const { spawn } = require("child_process");

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
    console.log(`stdout: ${data}`);
  });

  buildFront.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
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

module.exports = buildFront;

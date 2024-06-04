import fs from "fs";

const filePath = "/opt/render/project/src/models/user.js";

fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`${filePath} does not exist`);
  } else {
    console.log(`${filePath} exists`);
  }
});

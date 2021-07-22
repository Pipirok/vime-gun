const express = require("express");
const Gun = require("gun/lib/server");
require("gun/axe");

const app = express();
app.use(Gun.serve);
app.use(express.static(__dirname));

const PORT =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.argv[2] ||
  8765;

const server = app.listen(PORT, () =>
  console.log(`Gun relay started on port ${PORT}`)
);

let gun = Gun({ file: "data", web: server });

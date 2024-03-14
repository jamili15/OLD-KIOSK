import fs from "fs";
import path from "path";

// console.log("\n\n==============================");
// console.log("KIOSK_PRINT_SEVER_IP", process.env.KIOSK_PRINT_SEVER_IP);
// console.log("process.cwd()", process.cwd());
// console.log("==============================");

const connFilePath = path.join(process.cwd(), "connections.json");
const connJson = fs.readFileSync(connFilePath, "utf-8");
const connections = JSON.parse(connJson);

const envFilePath = path.join(process.cwd(), "env.json");
const envJson = fs.readFileSync(envFilePath, "utf-8");
const env = JSON.parse(envJson);

for (const key in env) {
  process.env[key] = env[key];
}
// console.log("ENV FILE", envFilePath);
// console.log("ENV ", env);

for (let key in connections) {
  const conn = connections[key];
  const appHost: string = conn["app.host"];
  const hostIpEnvRe = appHost.match(/\$\{(.*)\}/);
  if (hostIpEnvRe) {
    const hostIpAddr: string = hostIpEnvRe[1];
    conn["app.host"] = appHost.replace(/\$\{.*\}/, process.env[hostIpAddr]!);
  }
}

// console.log("\n\nCONNECTIONS==================");
// console.log(connections);
// console.log("\n\nCONNECTIONS==================");

export default connections;

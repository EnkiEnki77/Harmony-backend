const config = {
    development:{port: process.env.port || "3001"},
    production:{},
    DB_CONNECTION: "mongodb://localhost:27017/HarmonyDB"

}

module.exports = config
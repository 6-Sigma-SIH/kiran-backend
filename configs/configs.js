require("dotenv").config();

module.exports = {
  mongodb: {
    //Database Configuration
    port: process.env.DB_PORT || 27017,
    dbName: process.env.DB_NAME,
    url:
      process.env.DB_URL ||
      "mongodb+srv://manankarani:manan2000@manan-cluster.zf3ho.mongodb.net/KiranApp?retryWrites=true&w=majority",
    host: process.env.PROD_HOST,
    user: process.env.DB_USER,
    mongoOptions: {},
  },
  serverPort: process.env.PORT || 4000,
  portal: {
    baseApiUrl: "/v2",
    token: {
      privateKey: "LŌcĀtĒ",
      expiry: "30d",
    },
  },
};

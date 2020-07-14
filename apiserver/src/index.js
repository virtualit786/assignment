import express from "express";
import http from "http";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import apolloServer from "./graphql";

var port = process.env.PORT || "4000";
const app = express();
app.use(helmet());
app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 60, // limit each IP to 60 requests per windowMs
  })
);
const server = http.createServer(app);

apolloServer.applyMiddleware({ app, path: "/graphql" });
apolloServer.installSubscriptionHandlers(server);

server.listen(port, () => {
  console.log("Server started!");
});
server.on("error", (err) => {
  console.error(err);
});
server.on("listening", () => {
  console.log("listening on port ", port);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

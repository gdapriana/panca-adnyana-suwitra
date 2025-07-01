import web from "./application/web";
import logger from "./application/logging";

web.listen(5050, () => {
  logger.info("Listening on port 5050");
});

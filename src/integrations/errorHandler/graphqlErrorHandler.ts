import { useErrorHandler } from "@envelop/core";
import { logger } from "#/integrations/index.js";

export const errorHandler = useErrorHandler(({ errors, context, phase }) => {
  for (const error of errors) {
    logger.error(
      {
        error,
        phase,
        requestId: context.requestId,
        path: error.path,
      },
      "GraphQL request failed",
    );
  }
});

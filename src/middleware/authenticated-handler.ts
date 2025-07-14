import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { verifyToken } from "./middleware";
type LambdaHandler = (event: APIGatewayProxyEvent, user: any) => Promise<APIGatewayProxyResult>;

export const authenticatedHandler = (
  handler: LambdaHandler,
  allowedRoles: string[] = []  // por defecto cualquiera
) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const decoded = verifyToken(event);

      // Verificar roles si se especificaron
       if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return {
          statusCode: 403,
          body: JSON.stringify({
            message: "Forbidden: insufficient permissions",
          }),
        };
      } 

      return await handler(event, decoded);
    } catch (error) {
      console.error("Auth error:", error);
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: error instanceof Error ? error.message : "Unauthorized",
        }),
      };
    }
  };
};

import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3001", // o tu dominio específico
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(response)
  };
};

import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { container } from "src/config/inversify.config";
import { authenticatedHandler } from "src/middleware/authenticated-handler";
import { UsersService } from "src/users/services/users.services";

export const main = authenticatedHandler( async (event:APIGatewayProxyEvent,_user) => {
  const userId = event.pathParameters.id;
  try {
    const usersService = container.get(UsersService);

    const user = await usersService.getUserById(Number(userId));

    if (!user) {
      return formatJSONResponse(
        {
          message: "Usuario no encontrado",
        },
        404
      );
    }

    return formatJSONResponse({
      message: "Usuario encontrado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(
      {
        message: "Error al obtener el usuario",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      500
    );
  }
});
import { formatJSONResponse } from "@libs/api-gateway";
import { UsersService } from "src/users/services/users.services";
import { container } from "src/config/inversify.config";
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = async (event: APIGatewayProxyEvent) => {
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
}
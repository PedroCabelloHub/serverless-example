import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { container } from "src/config/inversify.config";
import { authenticatedHandler } from "src/middleware/authenticated-handler";
import { UsersService } from "src/users/services/users.services";
export const main = authenticatedHandler ( async (event: APIGatewayProxyEvent) => {
  try {
    if (!event.pathParameters?.id) {
      return formatJSONResponse(
        { message: "Debe proporcionar un ID en la URL" },
        400
      );
    }

    const userId = event.pathParameters.id;
    const usersService = container.get(UsersService);

    const existingUser = await usersService.getUserById(Number(userId));

    if (!existingUser) {
      return formatJSONResponse(
        { message: "Usuario no encontrado" },
        404
      );
    }

    const user = await usersService.deleteUser(Number(userId));

    return formatJSONResponse({
      message: "Usuario eliminado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(
      {
        message: "Error al eliminar el usuario",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      500
    );
  }
},["ADMIN"]);

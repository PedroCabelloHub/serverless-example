import { formatJSONResponse } from "@libs/api-gateway";
import { container } from "src/config/inversify.config";
import { authenticatedHandler } from "src/middleware/authenticated-handler";
import { UsersService } from "src/users/services/users.services";
export const main = authenticatedHandler(async (_event, _user) => {
  try {
    const usersService = container.get(UsersService);

    const users = await usersService.getUsers();

    if (!users || users.length === 0) {
      return formatJSONResponse(
        {
          message: "No se encontraron usuarios",
        },
        404
      );
    }

    return formatJSONResponse({
      message: "Lista de usuarios obtenida correctamente",
      users,
    });
  } catch (error) {
    console.error(error);
    return formatJSONResponse(
      {
        message: "Error al obtener usuarios",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      500
    );
  }
});

import { APIGatewayProxyResult } from "aws-lambda";
import { container } from "src/config/inversify.config";
import { authenticatedHandler } from "src/middleware/authenticated-handler";
import { UsersService } from "src/users/services/users.services";

export const main = authenticatedHandler(async (
  _event,
  decodedUser
): Promise<APIGatewayProxyResult> => {
  try {
    const userService = container.get(UsersService);
    const user = await userService.getUserById(decodedUser.sub);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Usuario no encontrado" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
    };
  } catch (error) {
    console.error("Error en getProfile:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al obtener el perfil",
      }),
    };
  }
});

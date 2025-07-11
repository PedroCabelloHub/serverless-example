import { formatJSONResponse } from "@libs/api-gateway";
import { UsersService } from "src/users/services/users.services";
import { container } from "src/config/inversify.config";
import { APIGatewayProxyEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { UpdateUserDto } from "src/users/dto/users.dto";

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    if (!event.pathParameters?.id) {
      return formatJSONResponse(
        { message: "Debe proporcionar un ID en la URL" },
        400
      );
    }

    const userId = event.pathParameters.id;
    const body = JSON.parse(event.body || "{}");
    const dto = plainToInstance(UpdateUserDto, body);
    await validateOrReject(dto);

    const usersService = container.get(UsersService);
    const user = await usersService.updateUser(Number(userId), dto.name);

    if (!user) {
      return formatJSONResponse(
        { message: "Usuario no encontrado" },
        404
      );
    }

    return formatJSONResponse({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);

    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      const messages = error
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      return formatJSONResponse(
        {
          message: "Validation failed",
          errors: messages,
        },
        400
      );
    }

    return formatJSONResponse(
      {
        message: "Error al actualizar el usuario",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      500
    );
  }
}

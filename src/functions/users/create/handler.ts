import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { CreateUserDto } from "src/users/dto/users.dto";
import { container } from "../../../config/inversify.config";
import { UsersService } from "../../../users/services/users.services";

export const main = async (event: APIGatewayEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const dto = plainToInstance(CreateUserDto, body);
    await validateOrReject(dto);

    const usersService = container.get(UsersService);
    // ¡No olvides el await aquí!
   const user =  await usersService.createUser(dto.name,dto.password,dto.email,dto.role);

    return formatJSONResponse({
      message: "User created successfully",
      user
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
        message: error instanceof Error ? error.message : "Unexpected error.",
      },
      400
    );
  }
};

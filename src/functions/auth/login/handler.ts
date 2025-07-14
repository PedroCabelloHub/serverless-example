import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { LoginUserDto } from "src/auth/dto/auth.dto";
import { AuthService } from "src/auth/services/auth.service";
import { container } from "src/config/inversify.config";

export const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    const dto = plainToInstance(LoginUserDto, body);
    await validateOrReject(dto);

    const authService = container.get(AuthService);
    const user = await authService.validateUser(dto.email, dto.password);

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Credenciales inválidas" }),
      };
    }

    const token = authService.generateToken(user.id,user.role);

    // Construir cookie
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`;

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": cookie
      },
      body: JSON.stringify({ message: "Login exitoso",token })
    };

  } catch (error) {
    console.error(error);

    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      const messages = error.map((err) => Object.values(err.constraints || {})).flat();
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Validation failed", errors: messages })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error instanceof Error ? error.message : "Unexpected error."
      })
    };
  }
};

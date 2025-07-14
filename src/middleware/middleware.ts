import { APIGatewayProxyEvent } from "aws-lambda";
import * as jwt from "jsonwebtoken";
import { AuthTokenPayload } from "src/types/types";


export const verifyToken = (event: APIGatewayProxyEvent) => {
  const cookieHeader = event.headers.Cookie || event.headers.cookie;
  if (!cookieHeader) {
    throw new Error("Token no proporcionado, debes de iniciar sesión");
  }

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) {
    throw new Error("Token no encontrado en cookie");
  }

  const token = tokenMatch[1];

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!isAuthTokenPayload(decoded)) {
        throw new Error("Token con formato inválido");
    }

    return decoded;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

function isAuthTokenPayload(obj: any): obj is AuthTokenPayload {
    return (
      obj &&
      typeof obj.sub === 'number' &&
      typeof obj.role === 'string'
    );
  }
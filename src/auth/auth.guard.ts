import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
 
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
 
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader: string = req.headers["authorization"] || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
 
    if (!token) throw new UnauthorizedException("No token provided");
 
    try {
      const payload = this.authService.verifyToken(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
 
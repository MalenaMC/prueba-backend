import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!roles) {
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user;

    if (!usuario || !roles.includes(usuario.rol)) {
      throw new ForbiddenException('No tienes permisos para esta acción');
    }
    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return matchRoles(roles, user.roles);

    // const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
    //   context.getHandler(), context.getClass(),
    // ])

    // if (!requiredRoles) {
    //   return true
    // }

    // const { user } = context.switchToHttp().getRequest()

    // const hasRole = requiredRoles.some((role) => user?.roles?.includes(role))

    // if (!hasRole) {
    //   throw new UnauthorizedException()
    // }

    // return true
  }
}

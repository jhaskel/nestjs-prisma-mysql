
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate  {

    constructor(private readonly authService:AuthService,
        private readonly userService:UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
     
     const request = context.switchToHttp().getRequest();
     const {authorization} = request.headers;

     try {

        const data =   this.authService.checkToken((authorization ?? '').split(' ')[1]);
        request.tokenPayload=data;

        request.user = await this.userService.show(data.id);

        return true;
        
     } catch (error) {
        return false;
     }
        
      

      

    }

}



import { Body, Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";
import { AuthLoginDto } from "./dto/aut-login-dto";
import { AuthRegisterDto } from "./dto/aut-register-dto";
import { AuthForgetDto } from "./dto/aut-forget-dto";
import { AuthResetDto } from "./dto/aut-reset-dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user-decorator ";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { join } from 'path';
import { FileService } from "src/file/file.service";
import { UpdatePatchUserDto } from "src/user/DTO/update-patch-user-dto";


@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService,
       
    ) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDto) {
       
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDto) {
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDto) {
        return this.authService.reset(password, token)

    }


    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {

        return { user }      
    }


    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({
                fileType: 'image'
            }),
            new MaxFileSizeValidator({
                maxSize: 1024 * 10000
            })
        ]

    })) photo: Express.Multer.File) {
        const ext = photo.originalname.split(".", 2)[1];

        console.log("ext " + ext);
        const usuario = user.id;

        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo${user.id}.${ext}`)

        try {
            await this.fileService.upload(photo, path);

            //sobrescreve o data
       
    
            const data:UpdatePatchUserDto = {
                image: path,
                updatedAt:  new Date().toISOString()
    
            }
    
                              
            //chama o serviço pra alterar apenas um dado
            await this.userService.updatePartial(usuario, data)

            
        } catch (error) {
            throw new BadRequestException(error)
        }
        return { success: true };

    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo${user.id}.png`)
        return { files };

    }


}
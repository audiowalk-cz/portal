import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginPomeziDto } from "../../dto/login.dto";

@Controller("login")
@ApiTags("Login")
export class LoginController {
  @Post("pomezi")
  loginPomezi(@Body() body: LoginPomeziDto) {}
}

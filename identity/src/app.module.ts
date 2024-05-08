import { Module } from "@nestjs/common";
import { DataController } from "./controllers/data/data.controller";
import { LoginController } from "./controllers/login/login.controller";

@Module({
  imports: [],
  controllers: [LoginController, DataController],
  providers: [],
})
export class AppModule {}

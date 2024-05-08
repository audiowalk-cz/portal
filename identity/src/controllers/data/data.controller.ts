import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Response } from "express";
import fs from "fs";
import mime from "mime";
import path from "path";
import { Token } from "src/access-control/decorators/token.decorator";
import { DataAccessToken } from "src/access-control/schema/data-access-token";
import { Config } from "src/config";

@Controller("data")
@ApiTags("Data")
export class DataController {
  @Get(":project/:file")
  @ApiOkResponse({ status: 200, description: "File content" })
  @ApiForbiddenResponse({ status: 403, description: "Access denied" })
  @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
  @ApiNotFoundResponse({ status: 404, description: "File not found" })
  getFile(
    @Param() file: string,
    @Param("project") projectId: string,
    @Token(DataAccessToken) token: DataAccessToken,
    @Res({ passthrough: false }) res: Response,
  ) {
    if (!token) throw new UnauthorizedException();
    if (token.projectId !== projectId) throw new ForbiddenException(`Access to project ${projectId} denied`);

    const filePath = path.resolve(Config.data.rootDir, String(token.projectId), file);

    if (!this.testFileExists(filePath)) throw new NotFoundException(`File ${file} not found`);

    const sourceStream = fs.createReadStream(filePath);

    const mimeType = mime.lookup(filePath, "application/octet-stream");
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${file}"`);

    sourceStream.pipe(res);
  }

  private async testFileExists(filePath: string) {
    if (!filePath.startsWith(Config.data.rootDir)) return false;

    return fs.promises.access(filePath).then(
      () => true,
      () => false,
    );
  }
}

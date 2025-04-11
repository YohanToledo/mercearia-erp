import { UseCaseError } from "@/core/errors/use-case-error";
import { ForbiddenException, HttpException } from "@nestjs/common";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not allowed");
  }

  toHttpException(): HttpException {
    return new ForbiddenException(this.message)
  }
}

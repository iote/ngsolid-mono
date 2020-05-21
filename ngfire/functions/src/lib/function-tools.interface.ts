import { Logger } from "./util/logger/logger.interface";
import { IObject } from "ngfire-shared";

import { AdminRepository } from "./data/repositories/admin-repository.model";

export interface FunctionTools {
  Logger: Logger;
  getRepository: <T extends IObject>(documentPath: string) => AdminRepository<T>;
}
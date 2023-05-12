import { SetMetadata } from '@nestjs/common';

export const ResponseMessage = (message: string) =>
  SetMetadata('response-message', message);

export interface GetResponseMessages {
  one?: { getOneNotFound: string | ''; getOneFound: string | '' };
  many?: { getManyFound: string | ''; getManyNotFound: string | '' };
}

export const GetResponseMessages = (
  responseMessages: GetResponseMessages,
): MethodDecorator => {
  return (target: object, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      if (!result) {
        SetMetadata('response-message', responseMessages.one.getOneNotFound);
      } else if (!Array.isArray(result) && result) {
        SetMetadata('response-message', responseMessages.one.getOneFound);
      } else if (Array.isArray(result) && result.length === 0) {
        SetMetadata('response-message', responseMessages.many.getManyNotFound);
      } else {
        SetMetadata('response-message', responseMessages.many.getManyFound);
      }
      return result;
    };
    return descriptor;
  };
};

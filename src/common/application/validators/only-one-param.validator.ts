import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';



/**
 * //TODO
 */
export function ValidateOneAndOnlyOneParam(
  props: string[],
  validationOptions?: ValidationOptions,
) {
  console.log(`'ValidateOneAndOnlyOneParam'`) 
   
  return function (object: object, a: any) {
console.log('a',  a) 
 
    const propsString = props.join(', ');
     

    validationOptions = validationOptions ?? {};

    validationOptions.message =
      validationOptions?.message ||
      `You must provide one and only one of the following properties: ${propsString}`;

    registerDecorator({
      name: 'validateOneAndOnlyOneParam',
      target: object.constructor,
      propertyName:a,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(args) 
           
          let count = 0;
          props.forEach((prop) => {
            if (args.object[prop] !== undefined && args.object[prop] !== null) {
              count++;
            }
          });

          return count === 1;
        },
      },
    });
  };
}

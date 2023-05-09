export enum UserApiResponses {
  CREATED = 'Usuario creado con exito',
  UPDATED = 'Usuario actualizado con exito',
  DELETED = 'Usuario eliminado con exito',
  NOT_FOUND = 'El usuario no se encontro',
  USER_ALREADY_EXISTS = 'El usuario ya existe',
  USER_NOT_LOGGED_IN = 'El usuario no se encontro en la sesion',
  GET_ONE = 'Usuario encontrado',
  GET_MANY = 'Listado de usuarios',
}


export enum RoleApiResponses {
    CREATED = 'Rol creado con exito',
    UPDATED = 'Rol actualizado con exito',
    DELETED = 'Rol eliminado con exito',
    GET_ONE = 'Rol encontrado',
    GET_MANY = 'Listado de roles',
    NOT_FOUND = 'Rol no encontrado',
    NO_DEFAULT = 'No se ha encontrado un rol por defecto'
}

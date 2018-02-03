export type ClassNameArg =
  | string
  | boolean
  | (() => ClassNameArg)
  | { [key: string]: boolean }
  | Array<ClassNameArg>;

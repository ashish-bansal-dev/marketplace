export const defaults = ["id", "is_enabled"]

export const retrieveTransformQueryConfig = {
  defaults,
  isList: false,
}

export const listTransformQueryConfig = {
  ...retrieveTransformQueryConfig,
  isList: true,
}

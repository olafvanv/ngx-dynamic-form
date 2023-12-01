export function isNumber(val: unknown): val is Number {
  return typeof val === 'number';
}

export function isBoolean(val: unknown): val is Boolean {
  return typeof val === 'boolean';
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

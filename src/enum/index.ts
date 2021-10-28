import { isNumeric } from '../util';

/**
 * get enum keys
 */
export const getEnumKeys = (o: object) => Object.keys(o).filter((key) => !isNumeric(key));

/**
 * get enum values
 */
export const getEnumValues = (o: object) => getEnumKeys(o).map((key) => Reflect.get(o, key));

import type { OpenAPIV2 } from 'openapi-types';
import converter from 'swagger2openapi';

export const convertSwaggerToOpenapi = (swagger: OpenAPIV2.Document) => {
  return converter.convertObj(swagger, { patch: true, warnOnly: true });
};

import { join } from 'node:path';
import process from 'node:process';
import { beforeAll, describe, expect, it } from '@jest/globals';
import type { OpenAPIV3 } from 'openapi-types';
import SwaggerParser from '@apidevtools/swagger-parser';
import { getSchema, getSchemaInfo } from '@/swagger/getSchema';

describe('swagger parse v3', () => {
  let doc: OpenAPIV3.Document;

  beforeAll(async () => {
    const _assets_path = join(process.cwd(), '__test_assets__');
    const swagger = join(_assets_path, 'v3.json');
    doc = (await SwaggerParser.parse(swagger)) as OpenAPIV3.Document;
  });

  it('getSchema', () => {
    const schema = getSchema(doc, { schema: '#/components/schemas/UpdateFeedDto' });
    expect(schema).toHaveProperty(['properties', 'content', 'type'], 'string');
  });

  it('getSchemaInfo', () => {
    const res = getSchemaInfo(doc, { schema: '#/components/schemas/CosBucket' });
    expect(res).toBeDefined();
  });
});

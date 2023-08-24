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
    expect(res).toEqual([
      {
        description: 'bucket 在系统中的名称',
        key: 'name',
        required: true,
        type: 'string',
      },
      {
        key: 'id',
        required: true,
        type: 'number',
      },
      {
        key: 'Bucket',
        required: true,
        type: 'string',
      },
      {
        key: 'Region',
        required: true,
        type: 'string',
      },
      {
        key: 'ACL',
        required: true,
        type: 'object',
      },
      {
        key: 'CORSRules',
        required: true,
        type: 'array',
      },
      {
        key: 'RefererConfiguration',
        required: true,
        type: 'object',
      },
      {
        format: 'date-time',
        key: 'createdAt',
        required: true,
        type: 'string',
      },
      {
        format: 'date-time',
        key: 'updatedAt',
        required: true,
        type: 'string',
      },
      {
        key: 'tencentCloudAccount',
        required: true,
        type: 'object',
      },
      {
        key: 'assets',
        required: true,
        type: 'array',
      },
      {
        key: 'public',
        required: true,
        type: 'boolean',
      },
    ]);
  });
});

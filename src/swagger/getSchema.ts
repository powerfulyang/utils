import traverse from 'json-schema-traverse';
import type { OpenAPIV3 } from 'openapi-types';

export const getSchemaName = (schema: string) => {
  let _schema = schema;

  if (_schema.startsWith('#')) {
    const _ = _schema.split('/').pop();
    if (_) {
      _schema = _;
    } else {
      throw new Error('schema is not valid');
    }
  } else if (_schema.includes('/')) {
    throw new Error('remote schema is not support');
  }

  return _schema;
};

interface Options {
  schema: string | OpenAPIV3.SchemaObject;
}

export const getSchema = (doc: OpenAPIV3.Document, options: Options) => {
  const { schema } = options;
  if (typeof schema === 'object') {
    return schema;
  }
  const _schema = getSchemaName(schema);
  const schemas = doc.components?.schemas;
  const entity = schemas && schemas[_schema];
  if (!entity) throw new Error(`Entity ${_schema} not found in ${doc.info.title}`);
  return entity;
};

interface SchemaInfo {
  key: string | number;
  required: boolean;
  type: string;
  format?: string;
  description?: string;
}

export const getSchemaInfo = (doc: OpenAPIV3.Document, options: Options) => {
  const _schema = getSchema(doc, options);
  const _schemaInfo: SchemaInfo[] = [];
  const visitedRefs = new Set<string>();

  const handleSchema = (
    schema: traverse.SchemaObject,
    parentSchema: traverse.SchemaObject | undefined,
    keyIndex: string | number | undefined,
  ) => {
    if (keyIndex === undefined) return;

    // 如果存在$ref引用，解析引用并调用handleSchema
    if (schema.$ref) {
      const refSchemaName = getSchemaName(schema.$ref);

      // 检查是否已访问过该引用
      if (visitedRefs.has(refSchemaName)) {
        return; // 已访问过该引用，所以跳过
      }
      visitedRefs.add(refSchemaName);

      const refSchema = doc.components?.schemas && doc.components.schemas[refSchemaName];
      if (refSchema) {
        handleSchema(refSchema, parentSchema, keyIndex);
        return;
      }
      throw new Error(`Referenced schema ${refSchemaName} not found`);
    }

    // 将信息添加到_schemaInfo
    _schemaInfo.push({
      key: keyIndex,
      required: parentSchema?.required?.includes(keyIndex),
      type: schema.type,
      format: schema.format,
      description: schema.description,
    });

    // 如果schema具有属性，则递归遍历属性
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        // @ts-ignore
        handleSchema(propSchema, schema, key);
      }
    }

    // 如果schema具有items，则递归遍历items
    if (schema.items) {
      handleSchema(schema.items, schema, 'items');
    }
  };

  traverse(
    _schema,
    {
      allKeys: true,
    },
    (schema, _jsonPtr, _rootSchema, _parentJsonPtr, _parentKeyword, parentSchema, keyIndex) => {
      handleSchema(schema, parentSchema, keyIndex);
    },
  );

  return _schemaInfo;
};

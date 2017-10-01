
declare module 'graphql-sync' {

  interface GraphQLType {

  }

  interface GraphQLInputType extends GraphQLType {

  }

  interface GraphQLOutputType extends GraphQLType { }

  interface Field { }

  interface FragmentDefinition { }

  interface GraphQLCompositeType { }

  interface OperationDefinition { }


  // GraphQLSchema

  export class GraphQLSchema {
    constructor(config: GraphQLSchemaConfig)
  }

  interface GraphQLSchemaConfig {
    query: GraphQLObjectType;
    mutation?: GraphQLObjectType;
  }


  // GraphQLScalarType

  class GraphQLScalarType<InternalType> implements GraphQLType {
    constructor(config: GraphQLScalarTypeConfig<InternalType>)
  }

  interface GraphQLScalarTypeConfig<InternalType> {
    name: string;
    description?: string;
    serialize: (value: any) => InternalType | void;
    parseValue?: (value: any) => InternalType | void;
    parseLiteral?: (valueAST: any) => InternalType | void;
  }


  // GraphQLObjectType
  export class GraphQLObjectType {
    constructor(config: GraphQLObjectTypeConfig)
  }

  interface GraphQLObjectTypeConfig {
    name: string;
    interfaces?: GraphQLInterfacesThunk | Array<GraphQLInterfaceType>;
    fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap;
    isTypeOf?: (value: any, info?: GraphQLResolveInfo) => boolean;
    description?: string
  }

  type GraphQLInterfacesThunk = () => Array<GraphQLInterfaceType>;

  type GraphQLFieldConfigMapThunk = () => GraphQLFieldConfigMap;

  // See below about resolver functions.
  type GraphQLFieldResolveFn = (
    source?: any,
    args?: { [argName: string]: any },
    context?: any,
    info?: GraphQLResolveInfo
  ) => any

  type GraphQLResolveInfo = {
    fieldName: string,
    fieldNodes: Array<Field>,
    returnType: GraphQLOutputType,
    parentType: GraphQLCompositeType,
    schema: GraphQLSchema,
    fragments: { [fragmentName: string]: FragmentDefinition },
    rootValue: any,
    operation: OperationDefinition,
    variableValues: { [variableName: string]: any },
  }

  type GraphQLFieldConfig = {
    type: GraphQLOutputType;
    args?: GraphQLFieldConfigArgumentMap;
    resolve?: GraphQLFieldResolveFn;
    deprecationReason?: string;
    description?: string;
  }

  type GraphQLFieldConfigArgumentMap = {
    [argName: string]: GraphQLArgumentConfig;
  };

  type GraphQLArgumentConfig = {
    type: GraphQLInputType;
    defaultValue?: any;
    description?: string;
  }

  type GraphQLFieldConfigMap = {
    [fieldName: string]: GraphQLFieldConfig;
  };


  // GraphQLInterfaceType

  class GraphQLInterfaceType {
    constructor(config: GraphQLInterfaceTypeConfig)
  }

  interface GraphQLInterfaceTypeConfig {
    name: string,
    fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap,
    resolveType?: (value: any, info?: GraphQLResolveInfo) => GraphQLObjectType | void,
    description?: string
  }

  // GraphQLUnionType
  class GraphQLUnionType {
    constructor(config: GraphQLUnionTypeConfig)
  }

  interface GraphQLUnionTypeConfig {
    name: string,
    types: GraphQLObjectsThunk | Array<GraphQLObjectType>,
    resolveType?: (value: any, info?: GraphQLResolveInfo) => GraphQLObjectType | void;
    description?: string;
  }

  type GraphQLObjectsThunk = () => Array<GraphQLObjectType>;

  // GraphQLEnumType

  class GraphQLEnumType {
    constructor(config: GraphQLEnumTypeConfig)
  }

  interface GraphQLEnumTypeConfig {
    name: string;
    values: GraphQLEnumValueConfigMap;
    description?: string;
  }

  interface GraphQLEnumValueConfigMap {
    [valueName: string]: GraphQLEnumValueConfig;
  }

  interface GraphQLEnumValueConfig {
    value?: any;
    deprecationReason?: string;
    description?: string;
  }

  interface GraphQLEnumValueDefinition {
    name: string;
    value?: any;
    deprecationReason?: string;
    description?: string;
  }

  // GraphQLInputObjectType

  class GraphQLInputObjectType {
    constructor(config: GraphQLInputObjectConfig)
  }

  interface GraphQLInputObjectConfig {
    name: string;
    fields: GraphQLInputObjectConfigFieldMapThunk | GraphQLInputObjectConfigFieldMap;
    description?: string;
  }

  type GraphQLInputObjectConfigFieldMapThunk = () => GraphQLInputObjectConfigFieldMap;

  interface GraphQLInputObjectFieldConfig {
    type: GraphQLInputType;
    defaultValue?: any;
    description?: string;
  }

  interface GraphQLInputObjectConfigFieldMap {
    [fieldName: string]: GraphQLInputObjectFieldConfig;
  }

  interface GraphQLInputObjectField {
    name: string;
    type: GraphQLInputType;
    defaultValue?: any;
    description?: string;
  }

  interface GraphQLInputObjectFieldMap {
    [fieldName: string]: GraphQLInputObjectField;
  }

  // GraphQLList

  class GraphQLList {
    constructor(type: GraphQLType)
  }

  class GraphQLNonNull {
    constructor(type: GraphQLType)
  }



  var GraphQLInt: GraphQLScalarType<Number>;
  var GraphQLFloat: GraphQLScalarType<Number>;
  var GraphQLString: GraphQLScalarType<String>;
  var GraphQLBoolean: GraphQLScalarType<Boolean>;
  var GraphQLID: GraphQLScalarType<any>;

}

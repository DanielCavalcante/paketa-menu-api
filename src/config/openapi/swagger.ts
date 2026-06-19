import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { createMenuSchema } from "../../modules/menu/schemas/create-menu.shema";
import { menuResponseSchema } from "../../modules/menu/schemas/response-menu.schema";

const registry = new OpenAPIRegistry();

/*
 * Schemas
 */

registry.register("CreateMenuRequest", createMenuSchema);

registry.register("MenuResponse", menuResponseSchema);

/*
 * Endpoints
 */

registry.registerPath({
  method: "post",
  path: "/api/v1/menus",
  tags: ["Menu"],

  request: {
    body: {
      content: {
        "application/json": {
          schema: createMenuSchema,
        },
      },
    },
  },

  responses: {
    201: {
      description: "Menu created successfully",

      content: {
        "application/json": {
          schema: menuResponseSchema,
        },
      },
    },

    409: {
      description: "Menu already exists",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/v1/menus",
  tags: ["Menu"],

  responses: {
    200: {
      description: "Menu tree retrieved successfully",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/v1/menus/{id}",
  tags: ["Menu"],

  request: {
    params: createMenuSchema.pick({}),
  },

  responses: {
    200: {
      description: "Menu deleted successfully",
    },

    404: {
      description: "Menu not found",
    },
  },
});

export const openApiDocument = new OpenApiGeneratorV3(
  registry.definitions,
).generateDocument({
  openapi: "3.0.0",

  info: {
    title: "Menu API",
    version: "1.0.0",
    description: "API for managing hierarchical menus",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
});

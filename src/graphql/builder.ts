import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "../generated/pothos.js";
import { prisma } from "#/integrations/database/prisma.service.js";
import { getDatamodel } from "../generated/pothos.js";
import type { Context } from "./context.js";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Context;
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
    exposeDescriptions: true,
  },
  relay: { clientMutationId: "omit", cursorType: "String" },
});

builder.queryType({});
builder.mutationType({});

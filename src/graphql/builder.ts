import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "../generated/pothos.js";
import { basePrisma, prisma } from "../common/config/prisma.js";
import { getDatamodel } from "../generated/pothos.js";
export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
  },
});
builder.queryType({});

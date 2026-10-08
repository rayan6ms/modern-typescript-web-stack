import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const journal = defineCollection({
  loader: glob({ base: "./src/content/journal", pattern: "**/*.md" }),
  schema: z.object({
    description: z.string().min(1),
    published: z.coerce.date(),
    title: z.string().min(1),
  }),
});

export const collections = { journal };

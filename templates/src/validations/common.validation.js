import { z } from "zod";

const idSchema = z.object({
  id: z.coerce.number().int().positive()
});

export default {
  idSchema
};
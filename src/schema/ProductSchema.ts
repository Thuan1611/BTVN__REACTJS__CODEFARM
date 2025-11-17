import z from "zod";

export const ProductSchema = z.object({
  name: z
    .string({ message: "Name phải là string" })
    .min(6, { message: "Phải 6 kí tự" }),
  priority: z.number({ message: "Priority phải là number" }),
  description: z.string().optional(),
  dueDate: z.date({ message: "DueDate phải là date" }),
  completed: z.boolean().default(false)
});

import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  user_type: z.enum(["S", "A", "C"], {
    errorMap: () => ({ message: "Selecione um tipo de usuário válido" }),
  }),
});

export type UserFormValues = z.infer<typeof userSchema>;

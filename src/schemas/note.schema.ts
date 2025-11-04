import { z } from 'zod';

export const NoteRequestDtoSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(2).max(1000),
});

export const NoteIdParamsSchema = z.object({
  id: z.string(),
});

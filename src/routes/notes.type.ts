import { z } from "zod";
import { NoteRequestDtoSchema } from "../schemas/note.schema";

export type Note = z.infer<typeof NoteRequestDtoSchema> & { id: string };

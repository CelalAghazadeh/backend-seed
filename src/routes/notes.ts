import fastify from "fastify";
import { Note } from "./notes.type";
import { NoteIdParamsSchema, NoteRequestDtoSchema } from "../schemas/note.schema";

const notes: Note[] = [];

export const router = fastify({ logger: true });

router.get('/healthz', async () => {
  return {
    ok: true,
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'dev',
  };
});

router.get('/notes', async (_, reply) => {
  const notes = _getAllNotes();
  return reply.status(200).send({ ok: true, data: notes });
});

router.post('/notes', async (request, reply) => {
  try {
    const parseResult = NoteRequestDtoSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ ok: false, error: 'Invalid request body', details: parseResult.error });
    }

    _addNote(parseResult.data.title, parseResult.data.content);
    return reply.status(200).send({ ok: true });
  } catch (error) {
    console.error('Error parsing request body:', error);
    return reply.status(400).send({ ok: false, error: 'Invalid request body' });
  }
});

router.get('/notes/:id', async (request, reply) => {
  const parseResult = NoteIdParamsSchema.safeParse(request.params);
  if (!parseResult.success) {
    return reply.status(400).send({ ok: false, error: 'Invalid note ID' });
  }
  const { id } = parseResult.data;
  const note = _findNoteById(id);
  if (!note) {
    return reply.status(404).send({ ok: false, error: 'Note not found' });
  }
  return reply.status(200).send({ ok: true, data: note });
});

router.delete('/notes/:id', async (request, reply) => {
  const parseResult = NoteIdParamsSchema.safeParse(request.params);
  if (!parseResult.success) {
    return reply.status(400).send({ ok: false, error: 'Invalid note ID' });
  }
  const { id } = parseResult.data;
  const deleted = _deleteNoteById(id);
  if (!deleted) {
    return reply.status(404).send({ ok: false, error: 'Note not found' });
  }
  return reply.status(200).send({ ok: true });
});

export default router;

const _getAllNotes = (): Note[] => {
  return notes;
};

const _addNote = (title: string, content: string): void => {
  const note = {
    id: crypto.randomUUID(),
    title,
    content
  } as Note;
  notes.push(note);
};

const _findNoteById = (id: string): Note | undefined => {
  return notes.find(note => note.id === id);
};

const _deleteNoteById = (id: string): boolean => {
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return true;
  }
  return false;
};

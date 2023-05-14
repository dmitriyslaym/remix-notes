import { LinksFunction, ActionFunction, redirect, LoaderFunction, MetaFunction } from '@remix-run/node';
import NewNote, { links as newNoteStylesLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';
import NoteList, { links as noteListStylesLinks } from '~/components/NoteList';
import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import { Note } from '~/utils/types';

export default function NotesPage() {
  const { notes } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <NewNote />
      <NoteList notes={notes} />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log('ErrorBoundary error', error);
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error">
        <h1>Oops in Notes</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <div className="error">
      <h1>Error has occurred in Notes</h1>
      <p>{(error as Error).message}</p>
    </div>
  )
}

export const loader: LoaderFunction = async () => {
  // For isRouteErrorResponse
  // throw json({
  //   message: 'Some error from server',
  // }, { status: 404, statusText: 'Not Found' })

  // For base error
  // throw new Error('Some error from server!!');

  // For success
  const notes = await getStoredNotes();
  return { notes };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newNote = Object.fromEntries(formData);
  newNote.id = String(new Date().toISOString());

  const existingNotes = await getStoredNotes();
  await storeNotes([...existingNotes, newNote] as Note[]);

  return redirect('/notes');
}

export const links: LinksFunction = () => [...newNoteStylesLinks(), ...noteListStylesLinks()];

export const meta: MetaFunction = () => ({
  title: 'All Notes',
  description: 'Check all the notes!'
})

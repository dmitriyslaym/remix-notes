import { LinksFunction, ActionFunction, redirect, LoaderFunction } from '@remix-run/node';
import NewNote, { links as newNoteStylesLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';
import NoteList, { links as noteListStylesLinks } from '~/components/NoteList';
import { useLoaderData } from '@remix-run/react';

export default function Notes() {
  const { notes } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <NewNote />
      <NoteList notes={notes} />
    </div>
  );
}

export function ErrorBoundary(props: { error: Error }) {
  console.log('props', props);
  return (
    <div className="error">
      <h1>Error has occurred in Notes</h1>
      {/*<p>{error.message}</p>*/}
    </div>
  )
}

export const loader: LoaderFunction = async () => {
  throw new Error('Some error from server');
  // const notes = await getStoredNotes();
  // return { notes };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newNote = Object.fromEntries(formData);
  newNote.id = String(new Date().toISOString());

  const existingNotes = await getStoredNotes();
  await storeNotes([...existingNotes, newNote]);

  return redirect('/notes');
}

export const links: LinksFunction = () => [...newNoteStylesLinks(), ...noteListStylesLinks()];

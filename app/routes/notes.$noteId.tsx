import { json, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import styles from '~/styles/note-details.css';
import { getStoredNotes } from '~/data/notes';
import {
  useLoaderData,
  Link,
} from '@remix-run/react';
import { Note } from '~/utils/types';

export default function NoteDetailsPage() {
  const { note } = useLoaderData<{ note: Note }>();

  return (
    <main id="note-details">
      <main>
        <header>
          <nav>
            <Link to="/notes">Back to all notes</Link>
          </nav>
          <h1>{note.title}</h1>
        </header>
        <p id="note-details-content">{note.content}</p>
      </main>
    </main>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes();
  const note = notes.find((note) => note.id === params.noteId);
  if (!note) {
    throw json('Note not found', {
      status: 404,
      statusText: 'Not found'
    })
  }

  return { note };
}

export const links: LinksFunction = () => [{
  rel: 'stylesheet',
  href: styles
}];

export const meta: MetaFunction = (props) => {
  console.log('Meta in note', props);

  return ({
    title: `Note ${props.data.note.title}`,
    description: props.data.note.content
  })
}

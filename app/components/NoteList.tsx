import styles from './NoteList.css';
import { Link } from '@remix-run/react';

function NoteList({ notes }: { notes: Array<{ id: string; title: string; content: string; }> }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <article>
            <Link to={note.id}>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
            </Link>
            <p>{note.content}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
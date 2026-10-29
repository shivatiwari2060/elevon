import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from '@/app/App';

export { PAGES, INDEXABLE_PATHS, NOT_FOUND_PATH, buildHead } from '@/data/seo';
export { SITE } from '@/data/site';

/** Renders the app for one URL to an HTML string, waiting for lazy routes to resolve. */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk: Buffer, _encoding, callback) {
        chunks.push(chunk);
        callback();
      },
      final(callback) {
        resolve(Buffer.concat(chunks).toString('utf8'));
        callback();
      },
    });
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      { onAllReady: () => pipe(sink), onError: reject, onShellError: reject },
    );
  });
}

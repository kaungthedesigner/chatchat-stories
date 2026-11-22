import { config, collection, fields } from '@keystatic/core';

// One collection per story; one entry per chapter file. Only the wording (English, Burmese) can be edited:
// id, who, where and own are kept as they are (fields.ignored), and the item label shows them. Adding,
// removing or reordering lines is a code change, and the checker's --text-only rule rejects it in a
// wording pull request.
const line = fields.object({
  id: fields.ignored(),
  who: fields.ignored(),
  where: fields.ignored(),
  en: fields.text({ label: 'English', multiline: true }),
  my: fields.text({ label: 'Burmese', multiline: true, description: 'Chats, reply options, posts and comments: no ။ or ၊. Scene lines end with ။.' }),
  own: fields.ignored(),
});

const storyText = (dir: string, label: string) =>
  collection({
    label,
    path: `stories/${dir}/text/*`,
    format: { data: 'json' },
    slugField: 'chapter',
    columns: ['title'],
    schema: {
      chapter: fields.slug({ name: { label: 'Chapter file' } }),
      title: fields.text({ label: 'Chapter' }),
      lines: fields.array(line, {
        label: 'Lines',
        itemLabel: p => {
          const f = p.fields as any, val = (k: string) => { let v = f[k] && f[k].value; while (v && typeof v === 'object' && 'value' in v) v = v.value; return v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v) };
          const id = val('id'), who = val('who'), where = val('where');
          return `${id} · ${who ? who + ' · ' : ''}${where} — ${p.fields.en.value}`;
        },
      }),
    },
  });

export default config({
  storage: import.meta.env.PUBLIC_KEYSTATIC_GITHUB === 'true'
    ? { kind: 'github', repo: 'kaungthedesigner/chatchat-stories', branchPrefix: 'text/' }
    : { kind: 'local' },
  ui: { brand: { name: 'Tales in between · wording' } },
  collections: {
    bre: storyText('before-the-rain-ends', 'Before the Rain Ends'),
  },
});

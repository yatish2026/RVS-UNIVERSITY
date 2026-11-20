import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowDownAZ, ArrowUp, Eye, EyeOff, ListPlus, Plus, Search, Tags, Trash2 } from 'lucide-react';
import type { FormSchema, ListDef } from '../types';
import { uniqueId } from '../engine';
import { Btn, Card, Field, IconBtn, Modal, TextArea, TextIn } from './ui';

type Mutate = (fn: (s: FormSchema) => void) => void;

export const ListsTab: React.FC<{ draft: FormSchema; saved: FormSchema; mutate: Mutate }> = ({ draft, saved, mutate }) => {
  const [listId, setListId] = useState(draft.lists.find((l) => l.id === 'departments')?.id ?? draft.lists[0]?.id ?? '');
  const [q, setQ] = useState('');
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const list = draft.lists.find((l) => l.id === listId);

  const usage = useMemo(() => {
    const m: Record<string, string[]> = {};
    for (const st of draft.steps)
      for (const sec of st.sections)
        for (const f of sec.fields) if (f.listId) (m[f.listId] ??= []).push(`${sec.title} › ${f.label}`);
    return m;
  }, [draft]);

  const savedIds = new Set(saved.lists.map((l) => l.id));
  const findList = (s: FormSchema) => s.lists.find((l) => l.id === listId)!;

  // Tag choices: existing tags + values of the Post Types list.
  const tagChoices = useMemo(() => {
    const set = new Set<string>();
    for (const o of draft.lists.find((l) => l.id === 'postTypes')?.options ?? []) set.add(o.label);
    for (const o of list?.options ?? []) for (const t of o.tags ?? []) set.add(t);
    return Array.from(set);
  }, [draft, list]);

  const groups = useMemo(() => Array.from(new Set((list?.options ?? []).map((o) => o.group).filter(Boolean))) as string[], [list]);

  const addList = () => {
    const id = uniqueId('New list', draft.lists.map((l) => l.id));
    mutate((s) => s.lists.push({ id, name: 'New list', description: '', options: [{ label: 'Option 1' }] }));
    setListId(id);
  };

  const move = (i: number, d: number) =>
    mutate((s) => {
      const arr = findList(s).options;
      const j = i + d;
      if (j < 0 || j >= arr.length) return;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    });

  const shown = (list?.options ?? []).map((o, i) => ({ o, i })).filter(({ o }) => !q || `${o.label} ${o.group ?? ''}`.toLowerCase().includes(q.toLowerCase()));

  const applyBulk = () => {
    const rows = bulkText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean)
      .map((r) => {
        const [a, b] = r.split('|').map((x) => x.trim());
        return b ? { label: b, group: a } : { label: a };
      });
    mutate((s) => {
      const l = findList(s);
      for (const r of rows) if (!l.options.some((o) => o.label === r.label)) l.options.push(r);
    });
    setBulkText('');
    setBulkOpen(false);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <Card title="Lists & categories" pad={false} actions={<Btn size="sm" icon={<Plus className="h-3.5 w-3.5" />} onClick={addList}>New</Btn>}>
        <ul className="space-y-0.5 p-2">
          {draft.lists.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => {
                  setListId(l.id);
                  setQ('');
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition ${
                  l.id === listId ? 'bg-[#1D1611] text-white' : 'text-[#3B2F25] hover:bg-[#FAF3E7]'
                }`}
              >
                <span className="truncate text-[13.5px] font-semibold">{l.name}</span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${l.id === listId ? 'bg-[#C6832B]' : 'bg-[#F3ECE0] text-[#867362]'}`}>
                  {l.options.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {list ? (
        <div className="min-w-0 space-y-4">
          <Card
            title="List details"
            actions={
              <Btn
                size="sm"
                variant="danger"
                icon={<Trash2 className="h-3.5 w-3.5" />}
                disabled={!!usage[list.id]?.length}
                title={usage[list.id]?.length ? 'In use by form fields' : undefined}
                onClick={() => {
                  if (!confirm(`Delete the list “${list.name}”?`)) return;
                  mutate((s) => {
                    s.lists = s.lists.filter((l) => l.id !== list.id);
                  });
                  setListId(draft.lists.find((l) => l.id !== list.id)?.id ?? '');
                }}
              >
                Delete list
              </Btn>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name">
                <TextIn value={list.name} onChange={(e) => mutate((s) => (findList(s).name = e.target.value))} />
              </Field>
              <Field label="Internal ID" hint={savedIds.has(list.id) ? '(locked)' : ''}>
                <TextIn className="font-mono" value={list.id} disabled />
              </Field>
              <Field label="Description" className="sm:col-span-2">
                <TextIn value={list.description ?? ''} onChange={(e) => mutate((s) => (findList(s).description = e.target.value))} />
              </Field>
            </div>
            <p className="mt-3 text-[12.5px] text-[#867362]">
              <span className="font-semibold text-[#6B5A4B]">Used by: </span>
              {usage[list.id]?.length ? usage[list.id].join(' · ') : 'not used by any field yet (pick it in Form Builder → field → Options → Shared list).'}
            </p>
          </Card>

          <Card
            pad={false}
            title={
              <span className="flex items-center gap-2">
                Options <span className="rounded-full bg-[#F3ECE0] px-2 py-0.5 text-[12px] text-[#6B5A4B]">{list.options.length}</span>
              </span>
            }
            actions={
              <>
                <Btn
                  size="sm"
                  icon={<ArrowDownAZ className="h-3.5 w-3.5" />}
                  onClick={() =>
                    mutate((s) =>
                      findList(s).options.sort((a, b) => (a.group ?? '').localeCompare(b.group ?? '') || a.label.localeCompare(b.label)),
                    )
                  }
                >
                  Sort A–Z
                </Btn>
                <Btn size="sm" icon={<ListPlus className="h-3.5 w-3.5" />} onClick={() => setBulkOpen(true)}>
                  Bulk add
                </Btn>
                <Btn
                  size="sm"
                  variant="primary"
                  icon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => {
                    mutate((s) => findList(s).options.push({ label: `New option ${list.options.length + 1}` }));
                    setQ('');
                  }}
                >
                  Add option
                </Btn>
              </>
            }
          >
            <div className="border-b border-[#F3ECE0] p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AD9A88]" />
                <TextIn value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search options…" className="pl-9" />
              </div>
              {tagChoices.length > 0 && (
                <p className="mt-2 flex items-start gap-1.5 text-[12px] text-[#867362]">
                  <Tags className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B57321]" />
                  Tags control filtering: e.g. a department tagged only “Teaching” appears only when the applicant picks Teaching. No tags = always shown.
                </p>
              )}
            </div>
            <datalist id={`groups-${list.id}`}>
              {groups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-[13px]">
                <thead className="bg-[#FDFAF5] text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#9C8B79]">
                  <tr>
                    <th className="px-3 py-2">Option</th>
                    <th className="px-3 py-2">Category / group</th>
                    <th className="px-3 py-2">Tags (applies to)</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6F0E7]">
                  {shown.map(({ o, i }) => (
                    <tr key={i} className={o.hidden ? 'opacity-50' : ''}>
                      <td className="px-3 py-1.5">
                        <TextIn value={o.label} onChange={(e) => mutate((s) => (findList(s).options[i].label = e.target.value))} />
                      </td>
                      <td className="px-3 py-1.5">
                        <TextIn
                          list={`groups-${list.id}`}
                          value={o.group ?? ''}
                          placeholder="—"
                          onChange={(e) =>
                            mutate((s) => {
                              const x = findList(s).options[i];
                              if (e.target.value) x.group = e.target.value;
                              else delete x.group;
                            })
                          }
                        />
                      </td>
                      <td className="px-3 py-1.5">
                        <div className="flex flex-wrap gap-1">
                          {tagChoices.map((t) => {
                            const on = o.tags?.includes(t);
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() =>
                                  mutate((s) => {
                                    const x = findList(s).options[i];
                                    const tags = new Set(x.tags ?? []);
                                    if (on) tags.delete(t);
                                    else tags.add(t);
                                    if (tags.size) x.tags = Array.from(tags);
                                    else delete x.tags;
                                  })
                                }
                                className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold transition ${
                                  on ? 'bg-[#1D1611] text-white' : 'bg-[#F3ECE0] text-[#9C8B79] hover:bg-[#EADFCF]'
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-1.5 text-right">
                        <IconBtn label="Move up" disabled={i === 0 || !!q} onClick={() => move(i, -1)}>
                          <ArrowUp className="h-3.5 w-3.5" />
                        </IconBtn>
                        <IconBtn label="Move down" disabled={i === list.options.length - 1 || !!q} onClick={() => move(i, 1)}>
                          <ArrowDown className="h-3.5 w-3.5" />
                        </IconBtn>
                        <IconBtn
                          label={o.hidden ? 'Show option' : 'Hide option'}
                          onClick={() =>
                            mutate((s) => {
                              const x = findList(s).options[i];
                              if (x.hidden) delete x.hidden;
                              else x.hidden = true;
                            })
                          }
                        >
                          {o.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </IconBtn>
                        <IconBtn
                          label="Delete option"
                          tone="danger"
                          onClick={() =>
                            mutate((s) => {
                              findList(s).options.splice(i, 1);
                            })
                          }
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </IconBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <Card>
          <p className="text-[#867362]">Select a list.</p>
        </Card>
      )}

      <Modal
        open={bulkOpen}
        onClose={() => setBulkOpen(false)}
        title={`Bulk add to “${list?.name ?? ''}”`}
        footer={
          <>
            <Btn onClick={() => setBulkOpen(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={applyBulk} disabled={!bulkText.trim()}>
              Add options
            </Btn>
          </>
        }
      >
        <div className="space-y-2 p-5">
          <p className="text-[13px] text-[#867362]">
            One option per line. To set a category, write <code className="rounded bg-[#F3ECE0] px-1">Category | Option</code>. Duplicates are skipped.
          </p>
          <TextArea rows={10} value={bulkText} onChange={(e) => setBulkText(e.target.value)} placeholder={'School of Engineering & Technology (SOET) | Civil Engineering\nMechanical Engineering'} />
        </div>
      </Modal>
    </div>
  );
};

export type { ListDef };

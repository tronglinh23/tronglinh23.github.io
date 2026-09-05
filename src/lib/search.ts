export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  difficulty?: string;
  ctf_event?: string;
}

export interface SearchState {
  q: string;
  category: string;
  difficulty: string;
  event: string;
  tag: string;
  sort: 'newest' | 'oldest' | 'title';
}

export function readSearchState(params: URLSearchParams): SearchState {
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    difficulty: params.get('difficulty') ?? '',
    event: params.get('event') ?? '',
    tag: params.get('tag') ?? '',
    sort: sort === 'oldest' || sort === 'title' ? sort : 'newest',
  };
}

export function isSearchActive(state: SearchState) {
  return Boolean(
    state.q.trim() ||
    state.category ||
    state.difficulty ||
    state.event ||
    state.tag ||
    state.sort !== 'newest'
  );
}

export function selectSearchItems<T extends SearchItem>(items: T[], state: SearchState): T[] {
  const terms = state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = items.filter((item) => {
    if (state.category && item.category !== state.category) return false;
    if (state.difficulty && item.difficulty !== state.difficulty) return false;
    if (state.event && item.ctf_event !== state.event) return false;
    if (state.tag && !item.tags.includes(state.tag)) return false;
    const text = [
      item.title,
      item.description,
      item.category,
      item.difficulty,
      item.ctf_event,
      ...item.tags,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return terms.every((term) => text.includes(term));
  });
  return filtered.sort((a, b) => {
    if (state.sort === 'title') return a.title.localeCompare(b.title);
    const delta = Date.parse(b.date) - Date.parse(a.date);
    return state.sort === 'oldest' ? -delta : delta;
  });
}

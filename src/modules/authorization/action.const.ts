export interface IAction {
  name?: string;
  code: string;
  priority: number;
}
export const actions: IAction[] = [
  { code: 'book.list', priority: 1001, name: 'Get list books' },
  { code: 'book.read', priority: 1002, name: 'Get a book' },
  { code: 'book.create', priority: 1003, name: 'Create new book' },
  { code: 'book.update', priority: 1004, name: 'Update a book' },
  { code: 'book.delete', priority: 1005, name: 'Delete a book' },
];

export const actionMaps = new Map<string, IAction>();

for (const action of actions) {
  actionMaps.set(action.code, action);
}

import type {NoteItem} from '../hooks/useStickyNoteStore.tsx'

export function setItemText(it: NoteItem, newText: string): NoteItem {
  switch (it.type) {
    case "text":
      return { id: it.id, type: "text", text: newText } as const;
    case "bullet":
      return { id: it.id, type: "bullet", text: newText } as const;
    case "checkbox":
      return { id: it.id, type: "checkbox", text: newText, checkboxStatus: it.checkboxStatus } as const;
  }
}

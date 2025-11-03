import React from 'react';
import { Trash2 } from 'lucide-react';

const EntryList = ({ items, onDelete }) => {
  if (!items.length) {
    return (
      <div className="text-sm text-center text-muted-foreground border rounded-2xl p-8">
        No entries yet. Add your first meal above!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-3 border rounded-xl p-4 bg-card/50"
        >
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-muted-foreground">{item.meal}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-semibold">{item.calories} kcal</div>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-red-600 transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;

import React from 'react';
import { Flame, Calendar } from 'lucide-react';

function formatPrettyDate(value) {
  try {
    const d = new Date(value);
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return value;
  }
}

const Header = ({ selectedDate, onDateChange }) => {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calorie Counter</h1>
          <p className="text-sm text-muted-foreground">Track your meals and stay on goal</p>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Calendar className="w-5 h-5 text-muted-foreground" />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <span className="hidden sm:inline text-muted-foreground">{formatPrettyDate(selectedDate)}</span>
      </label>
    </header>
  );
};

export default Header;

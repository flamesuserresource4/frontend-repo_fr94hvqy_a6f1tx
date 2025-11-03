import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import CalorieSummary from './components/CalorieSummary';
import FoodForm from './components/FoodForm';
import EntryList from './components/EntryList';

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const storageKeys = {
  entries: 'calorie.entries',
  goal: 'calorie.goal',
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [entries, setEntries] = useState([]);
  const [goal, setGoal] = useState(2000);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKeys.entries) || '{}');
      const savedGoal = Number(localStorage.getItem(storageKeys.goal));
      if (savedGoal && !Number.isNaN(savedGoal)) setGoal(savedGoal);
      // Flatten into array for state but keep raw for writes
      const all = Object.values(saved).flat();
      setEntries(all);
    } catch {
      // ignore
    }
  }, []);

  // Persist entries grouped by date
  useEffect(() => {
    const grouped = entries.reduce((acc, e) => {
      const key = e.date;
      acc[key] = acc[key] || [];
      acc[key].push(e);
      return acc;
    }, {});
    localStorage.setItem(storageKeys.entries, JSON.stringify(grouped));
  }, [entries]);

  // Persist goal
  useEffect(() => {
    localStorage.setItem(storageKeys.goal, String(goal));
  }, [goal]);

  const dayEntries = useMemo(
    () => entries.filter((e) => e.date === selectedDate).sort((a, b) => b.id - a.id),
    [entries, selectedDate]
  );

  const total = useMemo(() => dayEntries.reduce((sum, e) => sum + e.calories, 0), [dayEntries]);

  const handleAdd = ({ name, calories, meal }) => {
    const entry = {
      id: Date.now(),
      name,
      calories,
      meal,
      date: selectedDate,
    };
    setEntries((prev) => [entry, ...prev]);
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-foreground">
      <div className="max-w-3xl mx-auto px-4">
        <Header selectedDate={selectedDate} onDateChange={setSelectedDate} />

        <div className="grid gap-6">
          <CalorieSummary total={total} goal={goal} onGoalChange={setGoal} />
          <FoodForm onAdd={handleAdd} />
          <EntryList items={dayEntries} onDelete={handleDelete} />
        </div>

        <footer className="py-10 text-center text-xs text-muted-foreground">
          Built for quick daily tracking — your data is saved in your browser.
        </footer>
      </div>
    </div>
  );
}

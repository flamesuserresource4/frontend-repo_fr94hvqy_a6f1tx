import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const defaultState = { name: '', calories: '', meal: 'Breakfast' };

const FoodForm = ({ onAdd }) => {
  const [form, setForm] = useState(defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calories = Number(form.calories);
    if (!form.name.trim() || isNaN(calories) || calories <= 0) return;
    onAdd({ name: form.name.trim(), calories, meal: form.meal });
    setForm(defaultState);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border p-5 grid sm:grid-cols-5 gap-3 bg-card/50 backdrop-blur">
      <div className="sm:col-span-2">
        <label className="text-xs text-muted-foreground">Food</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g., Chicken salad"
          className="mt-1 w-full bg-background border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground">Calories</label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          placeholder="350"
          className="mt-1 w-full bg-background border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground">Meal</label>
        <select
          value={form.meal}
          onChange={(e) => setForm({ ...form, meal: e.target.value })}
          className="mt-1 w-full bg-background border rounded-md px-3 py-2"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </form>
  );
};

export default FoodForm;

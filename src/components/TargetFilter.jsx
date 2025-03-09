import { useEffect, useState } from "react";
import { fetchTargets } from "../services/ExerciseApi";

const TargetFilter = ({ onFilterChange }) => {
  const [targets, setTargets] = useState([]); // Available target types
  const [selectedTarget, setSelectedTarget] = useState(""); // Selected target

  useEffect(() => {
    const loadTargets = async () => {
      const targetList = await fetchTargets();
      setTargets(targetList);
    };

    loadTargets();
  }, []);

  const handleChange = (e) => {
    const newTarget = e.target.value;
    setSelectedTarget(newTarget);
    onFilterChange(newTarget); // Pass selected target to parent
  };

  return (
    <div className="flex justify-center mb-6">
      <select
        className="w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        value={selectedTarget}
        onChange={handleChange}
      >
        <option value="">All Targets</option>
        {targets.map((target) => (
          <option key={target} value={target}>
            {target}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TargetFilter;

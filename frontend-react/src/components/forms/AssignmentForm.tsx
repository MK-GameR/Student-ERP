import React, { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const AssignmentForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS-DSA');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;

    setIsPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsPublishing(false);
    
    setTitle('');
    setDescription('');
    setDeadline('');
    alert('Academic module criteria propagated downstream.');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Publish Lab Assignment Task</h3>
        <p className="text-xs text-gray-400">Deploy assessment criteria rules directly to student nodes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Assignment Headline Topic"
          type="text"
          placeholder="Implement Custom B-Trees Structures"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Core Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white dark:bg-slate-900 text-sm text-gray-900 dark:text-gray-100 border-gray-300 dark:border-slate-700 focus:ring-blue-500"
          >
            <option value="CS-DSA">Data Structures & Algorithms</option>
            <option value="CS-DBMS">Database Management Systems</option>
            <option value="CS-FSD">Full-Stack React & Redux</option>
          </select>
        </div>
      </div>

      <Input
        label="Evaluation Cutoff Deadline"
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Detailed Structural Prompts / Rules</label>
        <textarea
          rows={3}
          placeholder="Include sample standard edge cases, expected complexities ($O(n \log n)$ constraints), and memory deallocation criteria rules..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full py-2 text-xs" isLoading={isPublishing}>
        Deploy Assignment Matrix
      </Button>
    </form>
  );
};
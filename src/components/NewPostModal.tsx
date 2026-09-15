import React, { useState } from 'react';
import { PostCategory, User } from '../types';
import { CategoryBadge } from './StatusBadge';
import { 
  RuneSparkles, 
  RuneX, 
  RuneEdit, 
  RuneEye 
} from './icons/RuneIcons';
import confetti from 'canvas-confetti';

interface NewPostModalProps {
  currentUser: User;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; category: PostCategory }) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  currentUser,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PostCategory>('feature');
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const categories: { id: PostCategory; label: string }[] = [
    { id: 'feature', label: '🚀 Feature' },
    { id: 'improvement', label: '⚡ Improvement' },
    { id: 'bug', label: '🐛 Bug Report' },
    { id: 'integration', label: '🔌 Integration' },
    { id: 'ui-ux', label: '🎨 UI / UX' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim() || title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters long.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
    });

    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#3b82f6']
      });
    } catch (e) {
      // safe
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0d0f17] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-modal-in my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
        >
          <RuneX size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <RuneSparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              Suggest a Feature or Improvement
            </h2>
            <p className="text-xs text-zinc-400">
              Submitting as: <strong className="text-zinc-200">{currentUser.name}</strong>
            </p>
          </div>
        </div>

        {/* Tab switch between Editor and Preview */}
        <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              !isPreview ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <RuneEdit size={13} />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              isPreview ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <RuneEye size={13} />
            <span>Preview</span>
          </button>
        </div>

        {!isPreview ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category selection */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                      category === cat.id
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:bg-zinc-800/60 hover:text-zinc-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Proposal Title
                </label>
                <span className="text-[10px] text-zinc-500">{title.length}/80</span>
              </div>
              <input
                type="text"
                maxLength={80}
                placeholder="e.g. Automated Slack notifications or OAuth login"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                className={`w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 px-4 py-2.5 rounded-xl border focus:outline-none transition-all ${
                  errors.title ? 'border-rose-500/60' : 'border-zinc-800 focus:border-indigo-500/60'
                }`}
              />
              {errors.title && (
                <p className="text-[11px] text-rose-400 mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Detailed Description
                </label>
                <span className="text-[10px] text-zinc-500">{description.length}/1000</span>
              </div>
              <textarea
                rows={4}
                maxLength={1000}
                placeholder="Describe why this feature is important and how it improves your team workflow..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                className={`w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 p-3.5 rounded-xl border focus:outline-none transition-all resize-none ${
                  errors.description ? 'border-rose-500/60' : 'border-zinc-800 focus:border-indigo-500/60'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-rose-400 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 transition-all shadow-md shadow-indigo-600/25"
              >
                <RuneSparkles size={14} />
                <span>Publish Proposal</span>
              </button>
            </div>
          </form>
        ) : (
          /* Preview card */
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <CategoryBadge category={category} />
                <span className="text-xs text-zinc-500">Live Preview</span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 mb-2">
                {title || 'Your feature title will appear here'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">
                {description || 'Your description will appear here as you type.'}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsPreview(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Back to Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

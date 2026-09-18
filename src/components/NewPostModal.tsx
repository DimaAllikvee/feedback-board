import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PostCategory, User } from '../types';
import { CategoryBadge } from './StatusBadge';
import { 
  RuneSparkles, 
  RuneX, 
  RuneEdit, 
  RuneEye,
  RuneCode,
  RuneZap,
  RuneBug,
  RunePlug,
  RunePalette
} from './icons/RuneIcons';

interface NewPostModalProps {
  currentUser: User | null;
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

  const categories: { id: PostCategory; label: string; icon: React.ComponentType<{ size?: number | string; className?: string }> }[] = [
    { id: 'feature', label: 'Feature', icon: RuneCode },
    { id: 'improvement', label: 'Improvement', icon: RuneZap },
    { id: 'bug', label: 'Bug Report', icon: RuneBug },
    { id: 'integration', label: 'Integration', icon: RunePlug },
    { id: 'ui-ux', label: 'UI / UX', icon: RunePalette },
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

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-[#0c0d12] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with Tactile Feedback */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer"
        >
          <RuneX size={18} />
        </motion.button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200">
            <RuneSparkles size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              New Proposal
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Submitting as: <strong className="text-zinc-200">{currentUser?.name || 'Community Member'}</strong>
            </p>
          </div>
        </div>

        {/* Tab switch between Editor and Preview */}
        <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              !isPreview ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <RuneEdit size={13} />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isPreview ? 'bg-zinc-800 text-zinc-100 border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
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
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-600 shadow-sm ring-1 ring-zinc-700/50'
                          : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:bg-zinc-800/60 hover:text-zinc-200'
                      }`}
                    >
                      <Icon size={14} className={isSelected ? 'text-zinc-100' : 'text-zinc-500'} />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Proposal Title
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">{title.length}/80</span>
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
                  errors.title ? 'border-rose-500/60' : 'border-zinc-800 focus:border-zinc-600'
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
                <span className="text-[10px] text-zinc-500 font-mono">{description.length}/1000</span>
              </div>
              <textarea
                rows={4}
                maxLength={1000}
                placeholder="Describe the proposal, user problem, and expected outcome..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                className={`w-full bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 p-3.5 rounded-xl border focus:outline-none transition-all resize-none ${
                  errors.description ? 'border-rose-500/60' : 'border-zinc-800 focus:border-zinc-600'
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
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out shadow-sm cursor-pointer"
              >
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
                className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 cursor-pointer"
              >
                Back to Edit
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

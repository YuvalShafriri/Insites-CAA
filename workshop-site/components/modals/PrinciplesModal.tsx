import React from 'react';
import { Modal } from '../common';

export interface PrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrinciplesModal: React.FC<PrinciplesModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How to Do Cultural Assessment in Our Era?"
      maxWidth="max-w-6xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:items-start text-left" dir="ltr">
        <div className="md:col-span-2 order-1 md:order-2">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 md:-mt-2.5">
            How to Do Cultural Assessment in Our Era?
          </h3>
          <ul className="space-y-3 text-base mb-6 text-slate-700">
            <li className="flex gap-2">
              <span>•</span>
              <span>Heritage asset assessment requires historical, value-based, and communal thinking. In other words: human thinking.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>AI can lead to "an appearance of wisdom" — without deep understanding.</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>CBSA requires you to be present — to understand contexts, identify values, and articulate significance.</span>
            </li>
          </ul>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-3 font-bold uppercase bg-green-100 text-green-800 border-b border-slate-200">
                    ✅ Do
                  </th>
                  <th className="p-3 font-bold uppercase bg-red-100 text-red-800 border-b border-slate-200">
                    ❌ Don't
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-100 border-l font-medium">
                    Use the bot as a cognitive partner
                  </td>
                  <td className="p-4 border-b border-slate-100 font-medium">
                    Don't ask the bot to "write the entire assessment"
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-100 font-medium">
                    Don't copy without thinking
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-b border-slate-100 border-l font-medium">
                    Use it to formulate new questions
                  </td>
                  <td className="p-4 border-b border-slate-100 font-medium">
                    Don't skip your own analysis stage
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-slate-100 border-l font-medium">
                    Leverage the AI's pattern recognition and formulation capabilities
                  </td>
                  <td className="p-4 border-slate-100 font-medium">
                    But don't give up your "own voice"
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:col-span-1 order-2 md:order-1 space-y-6">
          <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-slate-200 bg-slate-50">
            <img
              src="https://alephplace.com/atar.bot/tamuz.jpg"
              alt="Work Principles"
              className="w-full h-auto object-cover"
            />
          </div>
          <blockquote className="bg-slate-50 p-5 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
            <p className="italic text-slate-600 text-sm leading-relaxed font-medium">
              "This is an elixir of forgetfulness, not of memory. They will not acquire wisdom, but only the semblance of wisdom..."
            </p>
            <cite className="block not-italic mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              (King Thamus to the god Theuth on the invention of writing — Phaedrus/Plato, 275a)
            </cite>
          </blockquote>
        </div>
      </div>
    </Modal>
  );
};

export default PrinciplesModal;

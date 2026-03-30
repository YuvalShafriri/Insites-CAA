import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import { Modal } from '../common';
import { ZAIRA_TEXT } from '../../constants';

export interface GraphInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputText: string;
  onInputTextChange: (value: string) => void;
  onSampleSelect?: (text: string, sampleKey: string) => void;
  onGenerate: (forceApi?: boolean) => void;
}

export const GraphInputModal: React.FC<GraphInputModalProps> = ({
  isOpen,
  onClose,
  inputText,
  onInputTextChange,
  onSampleSelect,
  onGenerate,
}) => {
  const loadZaira = () => {
    if (onSampleSelect) {
      onSampleSelect(ZAIRA_TEXT, "zaira");
    } else {
      onInputTextChange(ZAIRA_TEXT);
    }
  };

  // Auto-load Zaira on open if textarea is empty
  React.useEffect(() => {
    if (isOpen && !inputText.trim()) loadZaira();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Knowledge Graph" maxWidth="max-w-2xl">
      <div className="space-y-5">
        {/* Zaira text display */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Zaira — Italo Calvino, Invisible Cities</p>
          <p className="text-sm text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
            {inputText || ZAIRA_TEXT}
          </p>
        </div>

        {/* Generate button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              if (!inputText.trim()) loadZaira();
              onClose();
              onGenerate(false);
            }}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
          >
            <Zap size={18} />
            <span>Generate Zaira Graph</span>
          </button>
        </div>

        {/* Example links */}
        <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-100">
          <a
            href="https://gemini.google.com/share/03421deb044b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <ExternalLink size={12} /> Zaira KG — Gemini session
          </a>
          <a
            href="./chaco-kg.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-emerald-600 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <ExternalLink size={12} /> Chaco KG — assessment example
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default GraphInputModal;

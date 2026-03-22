import React, { useState } from 'react';
import { FileText, BookOpen, Zap, Landmark, Sparkles } from 'lucide-react';
import { Modal } from '../common';
import { DEMO_DATA, ZAIRA_TEXT } from '../../constants';
import { AYELET_WT_TEXT } from '../../sampleTexts';

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
  const [useApi, setUseApi] = useState(false);

  const selectSample = (text: string, key: string) => {
    if (onSampleSelect) {
      onSampleSelect(text, key);
    } else {
      onInputTextChange(text);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Knowledge Graph" maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
          <p className="text-xs text-emerald-800 font-medium leading-relaxed">
            This tool analyzes free text and extracts entities, values, and relationships to create a visual semantic map.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Text for analysis:</label>
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              onClick={() => selectSample(DEMO_DATA, "demo")}
              className="flex-1 min-w-[120px] py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <FileText size={14} /> תחנת הקמח
            </button>
            <button
              onClick={() => selectSample(ZAIRA_TEXT, "zaira")}
              className="flex-1 min-w-[120px] py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-900 border border-indigo-200 hover:border-indigo-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={14} /> Zaira City (Hebrew)
            </button>
            <button
              onClick={() => selectSample(AYELET_WT_TEXT, "ayelet")}
              className="flex-1 min-w-[120px] py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Landmark size={14} /> Ayelet HaShachar Water Tower (Hebrew)
            </button>
          </div>
          <textarea
            className="w-full h-48 p-4 bg-white rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm leading-relaxed text-slate-700 placeholder:text-slate-300 resize-none shadow-inner"
            placeholder="Paste the text you want to analyze here..."
            value={inputText}
            onChange={(e) => onInputTextChange(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setUseApi(!useApi)}
              className={`relative w-10 h-5 rounded-full transition-colors ${useApi ? 'bg-amber-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${useApi ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <Sparkles size={12} className={useApi ? 'text-amber-500' : 'text-slate-400'} />
              {useApi ? 'AI Live (Gemini Flash)' : 'Demo Mode'}
            </span>
          </label>
          <button
            onClick={() => {
              onClose();
              onGenerate(useApi);
            }}
            disabled={!inputText.trim()}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
          >
            <Zap size={18} />
            <span>Generate Knowledge Graph</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GraphInputModal;

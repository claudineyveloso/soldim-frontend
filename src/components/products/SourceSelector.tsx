// SourceSelector.tsx
import React from "react";

interface SourceSelectorProps {
  sources: any[];
  selectedSource: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({
  sources,
  selectedSource,
  onChange,
}) => {
  return (
    <div className="d-md-flex flex-wrap align-items-center gap-2 mb-3 mb-sm-0">
      <div className="text-center mb-2 mb-md-0">Somente por fonte:</div>
      <select
        className="form-select w-auto"
        aria-label="Categories"
        onChange={onChange}
        value={selectedSource}
      >
        <option value="">Todos</option>
        {sources.map((source) => (
          <option key={source.search_id} value={source.source}>
            {source.source}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceSelector;

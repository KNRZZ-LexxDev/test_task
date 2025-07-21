import React from 'react';

interface Props {
  displayCount: number;
  setDisplayCount: (count: number) => void;
  showDifferences: boolean;
  setShowDifferences: (val: boolean) => void;
}

const ComparisonFilters: React.FC<Props> = ({
  displayCount,
  setDisplayCount,
  showDifferences,
  setShowDifferences
}) => {
  return (
    <div className="comparison-filters"> {/* основной контейнер */}
      <div className="comparison-filters__item">
        <label className="comparison-filters__label">
          Отобразить товары:
          <select
            className="comparison-filters__select"
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}
          >
            {[2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="comparison-filters__item">
        <label className="comparison-filters__checkbox-label">
          <input
            type="checkbox"
            className="comparison-filters__checkbox"
            checked={showDifferences}
            onChange={(e) => setShowDifferences(e.target.checked)}
          />
          Показать различия
        </label>
      </div>
    </div>
  );
};

export default ComparisonFilters;
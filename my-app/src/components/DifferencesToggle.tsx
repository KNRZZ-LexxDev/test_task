import React from 'react';
import '../styles/difference_toggle_styles.scss';
interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const DifferencesToggle: React.FC<Props> = ({ checked, onChange }) => {
  return (
    <div className="differences-toggle">
      <label className="differences-toggle__label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="differences-toggle__input"
        />
        Показать различия
      </label>
    </div>
  );
};

export default DifferencesToggle;

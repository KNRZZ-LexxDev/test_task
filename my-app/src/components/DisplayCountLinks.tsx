import React from 'react';
import '../styles/display_count_links.scss';
interface Props {
  value: number;
  onChange: (val: number) => void;
}

const DisplayCountLinks: React.FC<Props> = ({ value, onChange }) => {
  const options = [2, 3, 4, 5, 6];

  return (
    <div className="display-count-links">
      <span className='display-count-links__text'>Отобразить товары: </span>
      {options.map((n) => (
        <a
          key={n}
          href="#"
          className={`link ${value === n ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onChange(n);
          }}
        >
          {n}
        </a>
      ))}
    </div>
  );
};

export default DisplayCountLinks;

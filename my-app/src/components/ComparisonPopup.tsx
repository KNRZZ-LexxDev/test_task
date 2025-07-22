import React, { useState, useEffect } from 'react';
import '../styles/comparison_popup_styles.scss';
interface Props {
  products: { id: number; name: string; image: string; features: Record<string, any> }[];
  onSelect: (product: { id: number; name: string; image: string; features: Record<string, any> }) => void;
  onClose: () => void;
}

const ComparisonPopup: React.FC<Props> = ({ products, onSelect, onClose }) => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredProducts(
      products.filter(p => p.name.toLowerCase().includes(lowerSearch))
    );
  }, [search, products]);

  return (
    <div className='popup'>
      <div className='popup__wrap' style={{
        overflowY: filteredProducts.length > 3 ? 'auto' : 'visible'
      }}>
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='popup__search-input'
          />
        <div className='popup__product-wrap'>
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className='popup__product-item'
              onClick={() => onSelect(p)}
            >
              <div className='popup__swap-product'></div>
              <img src={p.image} alt="" className='popup__product-image' />
              <div>{p.name}</div>
            </div>
          ))}
        </div>
        {/* <button onClick={onClose} style={{ marginTop: 10 }}>Закрыть</button> */}
      </div>
    </div>
  );
};

export default ComparisonPopup;

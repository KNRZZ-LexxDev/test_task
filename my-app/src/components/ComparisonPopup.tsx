import React, { useState, useEffect } from 'react';

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
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: '#fff',
        padding: 20,
        maxHeight: '80%',
        width: '80%',
        overflowY: filteredProducts.length > 3 ? 'auto' : 'visible'
      }}>
        {products.length > 3 && (
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {filteredProducts.map(p => (
            <div
              key={p.id}
              style={{
                border: '1px solid #ccc',
                padding: 10,
                width: 150,
                cursor: 'pointer'
              }}
              onClick={() => onSelect(p)}
            >
              <img src={p.image} alt="" style={{ width: '100%', height: 'auto' }} />
              <div>{p.name}</div>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ marginTop: 10 }}>Закрыть</button>
      </div>
    </div>
  );
};

export default ComparisonPopup;

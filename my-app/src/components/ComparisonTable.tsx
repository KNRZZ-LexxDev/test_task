import React from 'react';
import '../styles/comparison_table_styles.scss';

interface Product {
  id: number;
  name: string;
  features: Record<string, any>;
}

interface ComparisonTableProps {
  products: Product[];
  showDifferencesOnly: boolean;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ products, showDifferencesOnly }) => {
  // получаем все уникальные ключи характеристик
  const featureKeys = React.useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      Object.keys(p.features).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  }, [products]);

  // определяем ключи, по которым есть отличия
  const differences = React.useMemo(() => {
    const diffKeys: string[] = [];
    featureKeys.forEach(k => {
      const values = products.map(p => p.features[k]);
      const allEqual = values.every(val => val === values[0]);
      if (!allEqual) {
        diffKeys.push(k);
      }
    });
    return diffKeys;
  }, [products, featureKeys]);

  // фильтруем строки для отображения
  const displayKeys = React.useMemo(() => {
    return showDifferencesOnly ? differences : featureKeys;
  }, [showDifferencesOnly, differences, featureKeys]);

  return (
    <table className="comparison-table">
      {/* <thead>
        <tr>
          <th>Характеристика</th>
          {products.map(p => (
            <th key={p.id}>{p.name}</th>
          ))}
        </tr>
      </thead> */}
      <tbody>
        {displayKeys.map((k) => (
          <tr key={k}>
            <td>{k}</td>
            {products.map(p => (
              <td key={p.id}>{String(p.features[k] ?? '-')}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ComparisonTable;

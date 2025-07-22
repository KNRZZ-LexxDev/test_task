import React from 'react';
import '../styles/comparison_table_styles.scss';
import BooleanIcon from './BooleanIcon';

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

  const featureNames: Record<string, string> = {
    producer: 'ПРОИЗВОДИТЕЛЬ',
    releaseYear: 'ГОД РЕЛИЗА',
    screenSize: 'ДИАГОНАЛЬ ЭКРАНА (ДЮЙМ)',
    country: 'СТРАНА-ПРОИЗВОДИТЕЛЬ',
    memoryCapacity: 'ОБЪЕМ ПАМЯТИ',
    screenRefreshRate: 'ЧАСТОТА ОБНОВЛЕНИЯ ЭКРАНА',
    nfc: 'NFC',
    esimSupport: 'ПОДДЕРЖКА ESIM',
    wirelessCharging: 'ПОДДЕРЖКА БЕСПРОВОДНАЯ ЗАРЯДКА',
    cost: 'СТОИМОСТЬ',
  };

  const featureKeys = React.useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      Object.keys(p.features).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  }, [products]);

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

  const displayKeys = React.useMemo(() => {
    return showDifferencesOnly ? differences : featureKeys;
  }, [showDifferencesOnly, differences, featureKeys]);

  return (
    <table className="comparison-table">
      <tbody className='comparison-table__wrap'>
        {displayKeys.map((k) => (
          <tr key={k} className='comparison-table__row'>
            <td className='comparison-table__row__title-text'>{featureNames[k] ?? k}</td>
            {products.map(p => {
              const cellValue = p.features[k];
              if (typeof cellValue === 'boolean') {
                return (
                  <td key={p.id} className='comparison-table__row__desc-text'>
                    <BooleanIcon value={cellValue} />
                  </td>
                );
              }
              return (
                <td key={p.id} className='comparison-table__row__desc-text'>
                  {String(cellValue ?? '-')}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default ComparisonTable;

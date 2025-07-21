import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
    setDisplayCount,
    setShowDifferencesOnly,
    replaceProduct,
    Product,
} from '../store/comparisonSlice';



import DifferencesToggle from './DifferencesToggle';
import ProductCard from './ProductCard';
import ComparisonPopup from './ComparisonPopup';
import { Header } from './Header';
import '../styles/comparison_page_styles.scss';
import DisplayCountLinks from './DisplayCountLinks';

const ComparisonPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        selectedProducts,
        allProducts,
        displayCount,
        showDifferencesOnly
    } = useSelector((state: RootState) => state.comparison);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupProducts, setPopupProducts] = useState<Product[]>([]);
    const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

    const handleOpenPopup = (excludedProducts: Product[], index: number | null) => {
        setPopupProducts(excludedProducts);
        setReplaceIndex(index);
        setPopupOpen(true);
    };

    const handleReplace = (newProduct: Product) => {
        if (replaceIndex !== null) {
            dispatch(replaceProduct({ index: replaceIndex, newProduct }));
        }
        setPopupOpen(false);
    };

    const displayedProducts = selectedProducts.slice(0, displayCount);
    const notDisplayedProducts = selectedProducts.slice(displayCount);

    // Расчет различий
    const getDifferences = (): string[] => {
        if (!showDifferencesOnly) return [];
        const featuresKeys = new Set<string>();
        displayedProducts.forEach(p => {
            Object.keys(p.features).forEach(k => featuresKeys.add(k));
        });
        const differencesArr: string[] = [];
        featuresKeys.forEach((key) => {
            const values = displayedProducts.map(p => p.features[key]);
            const allEqual = values.every(val => val === values[0]);
            if (!allEqual) differencesArr.push(key);
        });
        return differencesArr;
    };

    const differences = getDifferences();

    return (
        <>
            <Header />
            <div className='comparison-page'>

                {/* Раздел с управлением количеством товаров */}
                <div className='comparison-page__count-control-wrap'>
                    <span className='comparison-page__title'>Смартфоны</span>
                    <DisplayCountLinks
                        value={displayCount}
                        onChange={(val) => dispatch(setDisplayCount(val))}
                    />
                </div>

                <div className='comparison-page__differents-control-wrap'>
                    {/* Раздел с переключателем различий */}
                    <DifferencesToggle
                        checked={showDifferencesOnly}
                        onChange={(val) => dispatch(setShowDifferencesOnly(val))}
                    />

                    {/* Карточки товаров */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
                        {displayedProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onReplace={() => {
                                    const otherProducts = allProducts.filter(p => p.id !== product.id);
                                    handleOpenPopup(otherProducts, index);
                                }}
                                showReplaceIcon={notDisplayedProducts.length > 0}
                            />
                        ))}
                        {/* {notDisplayedProducts.length > 0 && (
                            <div style={{ alignSelf: 'center', marginLeft: 20 }}>
                                <button onClick={() => handleOpenPopup(notDisplayedProducts, null)}>
                                    Заменить товар
                                </button>
                            </div>
                        )} */}
                    </div>
                </div>

                {/* Всплывающее окно для выбора товара */}
                {popupOpen && (
                    <ComparisonPopup
                        products={popupProducts}
                        onSelect={handleReplace}
                        onClose={() => setPopupOpen(false)}
                    />
                )}

                {/* Отображение различий */}
                {showDifferencesOnly && (
                    <div style={{ marginTop: 20 }}>
                        <h3>Только отличающиеся характеристики:</h3>
                        <ul>
                            {differences.map((diff) => (
                                <li key={diff}>{diff}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </>
    );
};

export default ComparisonPage;

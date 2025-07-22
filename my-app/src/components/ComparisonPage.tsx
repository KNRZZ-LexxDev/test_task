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
import ComparisonTable from './ComparisonTable';

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

    const handleOpenPopup = (index: number | null) => {
        // По умолчанию показывайте выбранные товары (первые 3, например)
        const selectedSubset = selectedProducts.slice(0, displayCount);
        // Исключаете из всех доступных выбранные товары
        const remainingProducts = allProducts.filter(
            p => !selectedSubset.some(sp => sp.id === p.id)
        );
        setPopupProducts(remainingProducts);
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


    return (
        <>
            <Header />
            <div className='comparison-page'>
                <div className='comparison-page__count-control-wrap'>
                    <span className='comparison-page__title'>Смартфоны</span>
                    <DisplayCountLinks
                        value={displayCount}
                        onChange={(val) => dispatch(setDisplayCount(val))}
                    />
                </div>
                <div className='comparison-page__differents-control-wrap'>
                    <DifferencesToggle
                        checked={showDifferencesOnly}
                        onChange={(val) => dispatch(setShowDifferencesOnly(val))}
                    />

                        <div className='comparison-page__product-card-wrap'>
                            {displayedProducts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onReplace={() => {
                                        const otherProducts = allProducts.filter(p => p.id !== product.id);
                                        handleOpenPopup(index);
                                    }}
                                    showReplaceIcon={notDisplayedProducts.length > 0}
                                />
                            ))}
                        </div>
                </div>
                {popupOpen && (
                    <ComparisonPopup
                        products={popupProducts}
                        onSelect={handleReplace}
                        onClose={() => setPopupOpen(false)}
                    />
                )}
            </div>
            <div className='comparison-page__comparison-table-wrap'>
                <ComparisonTable
                    products={displayedProducts}
                    showDifferencesOnly={showDifferencesOnly}
                />
            </div>
        </>
    );
};

export default ComparisonPage;

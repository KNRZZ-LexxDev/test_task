import React from 'react';
import supportImage from '../images/ui/support.png';
import unsupportImage from '../images/ui/no_support.png';
import '../styles/boolean_icon_styles.scss';
interface BooleanIconProps {
    value: boolean;
}

const BooleanIcon: React.FC<BooleanIconProps> = ({ value }) => {
    // Пути к картинкам — замените на свои
    const trueImage = supportImage; // например, галочка
    const falseImage = unsupportImage; // например, крестик

    return (
        <img
            className='icon'
            src={value ? trueImage : falseImage}
            alt={value ? 'Да' : 'Нет'}
        />
    );
};

export default BooleanIcon;

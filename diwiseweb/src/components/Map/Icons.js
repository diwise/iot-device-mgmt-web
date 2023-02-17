import solid from '../../assets/icons/solid.svg';
import brands from '../../assets/icons/brands.svg';
import regular from '../../assets/icons/regular.svg';

const icons = ({ iconSet, name, color, size }) => {
    return (
        <svg className="svg-icon" fill={color} width={size} height={size}>
            <use xlinkHref={`${iconSet}#${name}`} />
        </svg>
    );
};

const IconBrands = ({ name, color, size = "24px" }) => {
    return icons({ iconSet: brands, name, color, size });
};

const IconRegular = ({ name, color, size = "24px" }) => {
    return icons({ iconSet: regular, name, color, size });
};

const IconSolid = ({ name, color, size = "24px" }) => {
    return icons({ iconSet: solid, name, color, size });
};

export {
    IconSolid,
    IconBrands,
    IconRegular
};
import React from 'react';
import Styles from './ConditionalCategory.module.css';
type CategoriesTypes = {
  categories: string[];
};

const ConditionalCategory = ({ categories }: CategoriesTypes) => {
  return (
    <>
      <table className={Styles.conditional_category}>
        <tbody>
          <tr>
            {categories.slice(0, 4).map((category, index) => {
              return <td key={index}>{category}</td>;
            })}

            <td className={Styles.category_dots}>...</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ConditionalCategory;

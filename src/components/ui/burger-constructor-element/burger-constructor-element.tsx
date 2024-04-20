import {
  ConstructorElement,
  MoveButton
} from '@zlden/react-developer-burger-ui-components';
import { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import { BurgerConstructorElementUIProps } from './type';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> =
  memo(
    ({
      ingredient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    }) => (
      <li
        className={`${styles.element} mb-4 mr-2`}
        data-cy='constructor-filling'
      >
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            key={ingredient.id}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    )
  );

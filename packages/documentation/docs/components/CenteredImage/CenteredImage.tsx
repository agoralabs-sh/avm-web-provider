import React, { FC } from 'react';

// styles
import styles from './styles.module.scss';
import clsx from 'clsx';

interface IProps {
  label: string;
  maxWidth?: string;
  src: string;
}

const CenteredImage: FC<IProps> = ({
  label,
  maxWidth = '400px',
  src,
}: IProps) => {
  return (
    <div className={clsx(styles.container, styles.container__outer)}>
      <div
        className={styles.container}
        style={{
          maxWidth,
        }}
      >
        <img alt={label} aria-label={label} src={src} />
      </div>
    </div>
  );
};

export default CenteredImage;

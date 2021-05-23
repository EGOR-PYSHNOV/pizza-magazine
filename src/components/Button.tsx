import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  className?: string;
  outline?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ onClick, className, outline, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
};

export default Button;

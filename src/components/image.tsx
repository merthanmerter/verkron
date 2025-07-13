import type React from 'react';

const generateSrcSet = (src: string | Blob | undefined) => {
  const srcSet: string[] = [];
  for (let i = 1; i <= 10; i++) {
    srcSet.push(`${src}?w=${i * 100}&h=${i * 100}`);
  }
  return srcSet.join(', ');
};

const Image = ({
  alt,
  src,
  className,
  ...props
}: React.ComponentProps<'img'>) => {
  return (
    <img
      alt={alt}
      className={className}
      height={100}
      loading="lazy"
      sizes="100vw"
      src={src}
      srcSet={generateSrcSet(src)}
      width={100}
      {...props}
    />
  );
};

export default Image;

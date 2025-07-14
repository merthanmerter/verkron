import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const config: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(config);

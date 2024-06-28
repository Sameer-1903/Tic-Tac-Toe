// jest.config.ts

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  
  moduleNameMapper: {
    '\\.css$': 'C:/Users/sameerka/Desktop/Tic-tac-toe/Tic-tac-toe/mockStyleModule.ts', // Adjust path as needed
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/'],
};

export default config;

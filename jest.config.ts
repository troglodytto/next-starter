import NextJest from 'next/jest';

const createJestConfig = NextJest({
  dir: './',
});

const jestConfig = {
  moduleDirectories: ['node_modules', 'src/'],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(jestConfig);

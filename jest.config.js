/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.env.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverageFrom: [
        'features/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'context/**/*.{ts,tsx}',
        'hooks/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/__tests__/**',
        '!**/types/**',
        '!**/constants/**',
        '!components/ui/**',
        '!components/navigation/**',
        '!components/Notificaciones/**',
    ],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
};

module.exports = config;
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig({
  // Kết hợp các cấu hình mặc định
  extends: [
    ...nextVitals,
    ...nextTs,
  ],
  // Định nghĩa quy tắc
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Tắt cảnh báo về any
  },
  // Ghi đè các ignore mặc định
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      excludedFiles: [
        // Bỏ qua các tệp này
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
      ],
    },
  ],
});

export default eslintConfig;
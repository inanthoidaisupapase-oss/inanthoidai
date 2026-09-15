import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      /**
       * Dự án dùng <img> thay vì next/image một cách có chủ đích: template Printop
       * gắn class trực tiếp lên thẻ <img> (image-double-animation__element,
       * clip-animation-img, object-fit-cover...) và GSAP/AOS thao tác lên chính
       * thẻ đó. next/image bọc thêm wrapper và đổi thuộc tính nên sẽ làm lệch
       * giao diện so với bản gốc. Bật lại rule này khi đã thay hết ảnh thật và
       * chấp nhận chỉnh lại CSS tương ứng.
       */
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(import.meta.env.VITE_NONE === "production"
      ? { cssnano: {} }
      : {}),
  },
};

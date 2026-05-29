// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B5E20',
          hover: '#166534',
        },
        accent: '#F59E0B',
        background: '#FFFFFF',
        muted: '#F8FAF9',
        border: '#E5E7EB',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}

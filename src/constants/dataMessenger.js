export const dataMessenger = [
  {
    id: 1,
    name: 'vercel.json',
    language: 'json',
    content: `{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "http://a0830433.xsph.ru/$1"
    },
    {
      "source": "/api",
      "destination": "http://a0830433.xsph.ru"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-Requested-With, Content-Type, Accept"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}`
  },
  {
    id: 2,
    name: 'vite.config.js',
    language: 'javascript',
    content: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://a0830433.xsph.ru',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\\/api/, ''),
      }
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});`
  },
  {
    id: 3,
    name: 'apiSlice.js',
    language: 'javascript',
    content: `import { createSlice } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    idLast: null,
    isModal: false,
    dataMessages: {
      leftCol: [],
      centralCol: [],
      rightCol: [],
    },
    btnFilterFavourites: true,
    isReverse: false,
    isSearched: false,
    choice: {}
  },

  reducers: {
    setLastId: (state, action) => {
      state.idLast = action.payload;
    },
    setChoice: (state, action) => {
      state.choice = action.payload;
    },
    setStateBtnFilterFavourites: (state, action) => {
      state.btnFilterFavourites = action.payload;
    },

    setIsModal: (state, action) => {
      state.isModal = action.payload;
    },

    setDataMessages: (state, action) => {
      let arrModified = action.payload.map(object => {
        const dateModified = object.date.replace(/ /g, 'T').concat("Z");
        return { ...object, date: dateModified };
      });
      
      // Сортируем по дате (новые сверху по умолчанию)
      arrModified.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      
      const ids = arrModified.map(object => object.id);
      let id = Math.max(...ids);
      
      state.idLast = id;
      state.dataMessages.centralCol = arrModified;
    },

    setNewMessages: (state, action) => {
      const currentCentralCol = state.dataMessages.centralCol;
      const newCentralCol = action.payload.centralCol;
      
      if (JSON.stringify(currentCentralCol) !== JSON.stringify(newCentralCol)) {
        state.dataMessages = {
          ...state.dataMessages,
          centralCol: newCentralCol
        };
        
        if (newCentralCol.length > 0) {
          const ids = newCentralCol.map(msg => msg.id);
          state.idLast = Math.max(...ids);
        }
      }
    },

    setOldMessages: (state, action) => {
      const initialArr = state.dataMessages.centralCol;
      let arr = initialArr.concat(action.payload);
      let arrModified = arr.map(object => {
        const dateModified = object.date.replace(/ /g, 'T').concat("Z");
        return { ...object, date: dateModified };
      });
      arrModified.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      state.dataMessages.centralCol = arrModified;
    },

    handleButton: (state, action) => {
      const payload = action.payload;
      const filterData = (data) => data.filter((element) => JSON.stringify(element) !== JSON.stringify(action.payload.object));

      if (payload.column === "central") {
        if (payload.buttonName === "left") {
          const newArr = [payload.object, ...state.dataMessages.leftCol];
          let arr = newArr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          state.dataMessages.leftCol = arr;
        }
        if (payload.buttonName === "right") {
          const newArr = [payload.object, ...state.dataMessages.rightCol];
          let arr = newArr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          state.dataMessages.rightCol = arr;
        }
        state.dataMessages = { ...state.dataMessages, centralCol: filterData(state.dataMessages.centralCol) };
      } else if (payload.column === "right") {
        if (payload.buttonName === "left") {
          const newArr = [payload.object, ...state.dataMessages.leftCol];
          let arr = newArr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          state.dataMessages.leftCol = arr;
        }
        if (payload.buttonName === "central") {
          const newArr = [payload.object, ...state.dataMessages.centralCol];
          let arr = newArr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          state.dataMessages.centralCol = arr;
        }
        state.dataMessages = { ...state.dataMessages, rightCol: filterData(state.dataMessages.rightCol) };
      } else if (payload.column === "left") {
        if (payload.buttonName === "right") {
          const newArr = [payload.object, ...state.dataMessages.rightCol];
          let arr = newArr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          state.dataMessages.rightCol = arr;
        }
        if (payload.buttonName === "central") {
          const newArr = [payload.object, ...state.dataMessages.centralCol];
          let arr = newArr.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          state.dataMessages.centralCol = arr;
        }
        state.dataMessages = { ...state.dataMessages, leftCol: filterData(state.dataMessages.leftCol) };
      }
    },

    handleDeleteCard: (state, action) => {
      const payload = action.payload;
      const filterData = (data) => data.filter(
        (element) => JSON.stringify(element) !== JSON.stringify(action.payload.object));
      if (payload.column === "central") {
        state.dataMessages = { ...state.dataMessages, centralCol: filterData(state.dataMessages.centralCol) };
      } else if (payload.column === "right") {
        state.dataMessages = { ...state.dataMessages, rightCol: filterData(state.dataMessages.rightCol) };
      } else if (payload.column === "left") {
        state.dataMessages = { ...state.dataMessages, leftCol: filterData(state.dataMessages.leftCol) };
      }
    },

    handleAddingFavourires: (state, action) => {
      let payload = action.payload;
      state.dataMessages = payload;
    },

    onToggleReverse: (state, action) => {
      state.isReverse = action.payload;
    }
  }
});

export const {
  setLastId,
  setIsModal,
  setDataMessages,
  setNewMessages,
  setOldMessages,
  handleButton,
  handleDeleteCard,
  handleAddingFavourires,
  setStateBtnFilterFavourites,
  setChoice,
  onToggleReverse } = apiSlice.actions;

export default apiSlice.reducer;`
  },
  {
    id: 4,
    name: '_variables.scss',
    language: 'scss',
    content: `@use "sass:color";
@use "sass:map";
@use "sass:list";
@use "sass:string";

// ============================================
// ЦВЕТА
// ============================================

// Основные цвета
$primary-color: #3498db;
$primary-hover: #2980b9;
$primary-dark: #1c5a7a;
$secondary-color: #2ecc71;
$secondary-hover: #27ae60;
$accent-color: #e74c3c;
$accent-hover: #c0392b;

// Текст
$text-primary: #333333;
$text-secondary: #666666;
$text-light: #999999;
$text-inverse: #ffffff;
$text-muted: #777777;

// Фоны
$bg-primary: #ffffff;
$bg-secondary: #f8f9fa;
$bg-dark: #2c3e50;
$bg-darker: #1a252f;
$bg-light: #f5f7fa;
$bg-modal: rgba(0, 0, 0, 0.5);

// Формы
$form-bg: #ffffff;
$form-border: #ced4da;
$form-focus-border: #10c24b;
$form-focus-shadow: rgba(52, 152, 219, 0.25);
$form-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
$form-disabled-bg: #e9ecef;
$form-disabled-color: #6c757d;

// Границы
$border-color: #dee2e6;
$border-light: #e9ecef;
$border-dark: #ced4da;
$border-radius: 4px;
$border-radius-lg: 8px;
$border-radius-sm: 2px;

// Состояния
$success-color: #27ae60;
$success-light: #d4edda;
$error-color: #e74c3c;
$error-light: #f8d7da;
$warning-color: #f39c12;
$warning-light: #fff3cd;
$info-color: #3498db;
$info-light: #d1ecf1;

// Избранное
$favorite-color: #e74c3c;
$favorite-hover: #c0392b;
$favorite-inactive: #bdc3c7;
$favorite-inactive-hover: #95a5a6;

// Кнопки
$btn-primary-bg: $primary-color;
$btn-primary-border: $primary-color;
$btn-primary-hover: $primary-hover;
$btn-secondary-bg: #6c757d;
$btn-secondary-border: #6c757d;
$btn-secondary-hover: #5a6268;
$btn-disabled-bg: #e9ecef;
$btn-disabled-color: #6c757d;
$btn-disabled-border: #dee2e6;

// Карточки
$card-bg: #ffffff;
$card-border: $border-color;
$card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
$card-hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

// Колонки
$column-left-bg: #f8f9fa;
$column-center-bg: #ffffff;
$column-right-bg: #f8f9fa;
$column-border: #dee2e6;
$column-header-bg: #e9ecef;

// Табы
$tab-active-bg: $primary-color;
$tab-active-color: #ffffff;
$tab-inactive-bg: #f8f9fa;
$tab-inactive-color: #495057;
$tab-border: #dee2e6;
$tab-hover-bg: #e9ecef;

// Поиск
$search-bg: #ffffff;
$search-border: $border-color;
$search-focus-border: $primary-color;
$search-icon-color: #6c757d;
$search-clear-color: #e74c3c;

// Всплывающие окна
$popup-bg: #ffffff;
$popup-overlay: rgba(0, 0, 0, 0.5);
$popup-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
$popup-border: $border-color;
$popup-header-bg: #f8f9fa;

// Прелоадер
$preloader-bg: #f5f5f5;
$preloader-accent: $primary-color;
$preloader-size: 50px;

// Комментарии
$comment-bg: #f8f9fa;
$comment-border: #e9ecef;
$comment-author-color: $primary-color;
$comment-date-color: #6c757d;

// ============================================
// ТИПОГРАФИКА
// ============================================

// Размеры шрифтов
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$font-size-xxl: 24px;
$font-size-xxxl: 30px;

// Межстрочный интервал
$line-height-xs: 1.2;
$line-height-sm: 1.4;
$line-height-base: 1.5;
$line-height-lg: 1.6;
$line-height-xl: 1.8;

// Шрифты
$font-family-base: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
$font-family-mono: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// ============================================
// ОТСТУПЫ И РАЗМЕРЫ
// ============================================

// Отступы
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-xxl: 48px;

// Ширины и высоты
$header-height: 60px;
$footer-height: 40px;
$sidebar-width: 250px;
$max-width: 1200px;
$min-width: 320px;

// Размеры элементов
$button-height: 40px;
$input-height: 40px;
$card-min-height: 80px;
$avatar-size: 40px;

// ============================================
// ТЕНИ
// ============================================

$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
$shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);

// ============================================
// Z-INDEX
// ============================================

$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;

// ============================================
// АНИМАЦИИ И ТРАНЗИЦИИ
// ============================================

$transition-fast: 0.15s ease-in-out;
$transition-base: 0.3s ease-in-out;
$transition-slow: 0.5s ease-in-out;

// ============================================
// МЕДИА-ЗАПРОСЫ
// ============================================

// Брейкпоинты
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1400px;

// ============================================
// ПЕРЕМЕННЫЕ ДЛЯ ВАШЕГО ОШИБОЧНОГО КОДА
// ============================================

// Исправлено: заменили darken-color на color.adjust
$primary-hover-dark: color.adjust($primary-hover, $lightness: -10%);

// Дополнительные переменные для форм
$form-box-shadow: $form-shadow;
$form-focus-box-shadow: 0 0 0 0.2rem $form-focus-shadow;

$button-left-color: #3498db;
$button-central-color: #e74c3c;
$button-right-color: #2ecc71;

$radius: 4px;
$radius-sm: 4px;

// ============================================
// КАРТЫ ДЛЯ ЦВЕТОВ КНОПОК
// ============================================

$button-colors: (
  "left": #3498db,
  "central": #2ecc71,
  "right": #dc3d2c,
  "primary": #3498db,
  "secondary": #95a5a6,
  "danger": #e74c3c,
  "success": #27ae60,
  "warning": #f39c12,
  "info": #3498db
);

$heart-color: rgb(214, 49, 55);
$star-color: rgb(238, 234, 132);
$star-color-active: #FFC107;

// ============================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С ЦВЕТАМИ
// ============================================

@function transparentize-color($color, $amount) {
  @return color.adjust($color, $alpha: -$amount);
}

@function saturate-color($color, $percent) {
  @return color.adjust($color, $saturation: $percent * 1%);
}

@function desaturate-color($color, $percent) {
  @return color.adjust($color, $saturation: -$percent * 1%);
}
 
@function get-contrast-color($color) {
  @if (color.lightness($color) > 50) {
    @return #000000; 
  } @else {
    @return #ffffff; 
  }
}

@mixin color-transition($property: color, $duration: $transition-base) {
  transition: $property $duration ease;
}`
  },
  {
    id: 5,
    name: 'App.jsx',
    language: 'jsx',
    content: `// App.jsx будет загружен отдельно`
  }
];
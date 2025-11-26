
<template>
  <header class="header">
    <div class="header-inner">
      <div class="brand">
        <slot name="logo">
          <!-- ロゴが未指定ならテキストを表示 -->
          <span class="brand-text">My App</span>
        </slot>
      </div>

      <nav class="nav">
        <div class="dropdown" ref="dropdownRef">
          <button
            class="dropdown-toggle"
            @click="toggle"
            :aria-expanded="isOpen.toString()"
            aria-haspopup="menu"
          >
            メニュー
            <span class="caret" :class="{ open: isOpen }">▾</span>
          </button>

          <ul
            v-if="isOpen"
            class="dropdown-menu"
            role="menu"
            @keydown.escape.prevent="close"
          >
            <li
              v-for="(item, idx) in menuItems"
              :key="item.key || idx"
              role="menuitem"
            >
              <button
                class="dropdown-item"
                @click="handleSelect(item)"
                :title="item.title || item.label"
              >
                <span v-if="item.icon" class="icon" aria-hidden="true">{{ item.icon }}</span>
                {{ item.label }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    menuItems: {
      type: Array,
      default: () => [
        { key: 'home', label: 'ホーム' },
        { key: 'about', label: '概要' },
        { key: 'settings', label: '設定' }
      ]
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    handleSelect(item) {
      this.$emit('select', item);
      this.close();
    },
    handleClickOutside(e) {
      const el = this.$refs.dropdownRef;
      if (el && !el.contains(e.target)) {
        this.close();
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.header {
  background-color: #42b983;
  color: #fff;
  padding: 8px 16px;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-text {
  font-weight: 600;
  letter-spacing: 0.2px;
}

.nav {
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
}
.dropdown-toggle {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.dropdown-toggle:hover {
  background: rgba(255, 255, 255, 0.25);
}
.caret {
  transition: transform 0.15s ease;
}
.caret.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 8px;
  min-width: 160px;
  background: #fff;
  color: #2c3e50;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  padding: 6px;

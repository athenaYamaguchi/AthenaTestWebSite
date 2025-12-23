
<template>
  <header class="header">
    <div class="header-inner">
      <!-- ■□□ メニュー -->
      <nav class="nav left-area">
        <div class="dropdown" ref="dropdownRef">
          <button
            class="dropdown-toggle"
            @click="toggle"
            :aria-expanded="isOpen"
            aria-haspopup="menu"
          >
            Menu
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

      <!-- □■□ タイトル -->
      <div class="brand center-area">
        <span class="brand-text">{{ headerTitle }}</span>
      </div>

      <!-- □□■ ロゴ -->
      <div class="right-area">
        <img 
          src="@/assets/logo.png" 
          alt="ロゴ" 
          class="logo-image" 
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// Props定義
interface MenuItem {
  icon?: string
  key?: string
  label: string
  title?: string
  route?: string
}

const props = defineProps<{
  headerTitle?: string
  menuItems?: MenuItem[]
}>()

const emit = defineEmits<{
  (e: 'select', item: MenuItem): void
}>()

// デフォルト値
const headerTitle = props.headerTitle ?? 'アプリタイトル'
const menuItems = props.menuItems ?? [
  { 
    icon:   '🏠', 
    key:    'TopPage', 
    label:  'トップページ', 
    route:  '/' 
  },
  { 
    icon:   '🔧', 
    key:    'settings-page', 
    label:  '設定', 
    route:  '/settings-page' 
  },
  { 
    icon:   '📚', 
    key:    'MasterManagePage', 
    label:  'マスタ管理', 
    route:  '/MasterManagePage' 
  },
]

// 状態管理
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const router = useRouter()

// メニュー開閉
const toggle = () => {
  isOpen.value = !isOpen.value
}
const close = () => {
  isOpen.value = false
}

// メニュー選択
const handleSelect = (item: MenuItem) => {
  close()
  if (item.route) {
    router.push(item.route)
  }
  emit('select', item)
}

// 外側クリックで閉じる
const handleClickOutside = (e: MouseEvent) => {
  const el = dropdownRef.value
  if (el && !el.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  position: relative;
}

.left-area {
  min-width: 80px;
}

.right-area {
  min-width: 80px;
  position: absolute;
  left: 99%;
  transform: translateX(-50%);
  text-align: center;
}

.center-area {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-text {
  font-weight: 600;
  font-size: 30px;
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
  left: 0;
  margin-top: 8px;
  min-width: 200px;
  background: #fff;
  color: #2c3e50;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  padding: 6px;
  z-index: 1000;
  list-style: none;
  padding-left: 0;
}
.dropdown-item {
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: left;
  gap: 8px;
}
.dropdown-item:hover {
  background: #f3f4f6;
}
.icon {
  width: 1.1em;
  text-align: center;
}

.logo-image {
  height: 70px;       /* ヘッダーに合わせて調整 */
  width: auto;
  margin-top: 14px;   /* ← 下にずらす量 */
  margin-right: 20px; /* ← 左にずらす量 */
}


</style>

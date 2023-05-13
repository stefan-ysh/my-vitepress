<template>
  <div class="top-header">
    <div class="logo">
      <a href="/index">ysh</a>
    </div>
    <div class="nav">
      <button>Blog</button>
      <button>Projects</button>
      <button>Demos</button>
      <button>Tweet</button>
      <button>Weibo</button>
      <button @click="changeTheme">{{ isDark ? "Dark" : "Light" }}</button>
      <img src="/dark-feature-icon.svg" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
console.log("[ useDate() ] >", useData());
const isDark = ref(false);
const themeElClasLlist = ref();
isDark.value = localStorage.getItem("vitepress-theme-appearance") === "dark";

onMounted(() => {
  themeElClasLlist.value = document.documentElement.classList as any;
  themeElClasLlist.value[isDark.value ? "add" : "remove"]("dark");
  localStorage.setItem(
    "vitepress-theme-appearance",
    isDark.value ? "dark" : "light"
  );
});
const changeTheme = (event) => {
  //   const themeElClasLlist = document.documentElement.classList;
  // 检查 html元素上是否存在类名 dark
  //   const isDark = document.documentElement.classList.contains("dark");
  // 检查当前浏览器是否支持transition
  const isAppearanceTransition =
    // @ts-expect-error: Transition API
    document.startViewTransition &&
    !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  // 如果不支持,则直接切换类名
  if (!isAppearanceTransition) {
    // html 元素切换 dark类名，以此达到更换主题色的目的
    isDark.value = !isDark.value;
    themeElClasLlist.value[isDark.value ? "add" : "remove"]("dark");
    localStorage.setItem(
      "vitepress-theme-appearance",
      isDark.value ? "dark" : "light"
    );
    return;
  }
  // 如果支持,则执行更换主题的动画
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    // html 元素切换 dark类名，以此达到更换主题色的目的
    // themeElClasLlist.toggle("dark");
    isDark.value = !isDark.value;

    themeElClasLlist.value[isDark.value ? "add" : "remove"]("dark");
    localStorage.setItem(
      "vitepress-theme-appearance",
      isDark.value ? "dark" : "light"
    );
  });
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: !isDark.value ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: !isDark.value
          ? "::view-transition-new(root)"
          : "::view-transition-old(root)",
      }
    );
  });
  //   document.documentElement.classList.toggle("dark");
};
</script>
<style lang="less">
.top-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  .logo {
    font-family: fantasy;
  }
  .nav {
    button {
      margin-left: 1rem;
    }
  }
}
</style>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
</style>

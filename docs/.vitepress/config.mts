import { defineConfig } from 'vitepress'
import { getSidebar } from './utils/vitepress'

const engineeringSidebar = await getSidebar('engineering')

export default defineConfig({
  base: '/my-blog/',
  title: '个人博客',
  description: 'A Personal Blog',
  head: [['link', { rel: 'icon', href: 'aqing.ico' }]],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '工程化', link: '/engineering/pnpm' },
    ],

    sidebar: {
      ...engineeringSidebar,
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lovezhangchuangxin/my-blog',
      },
    ],

    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2023 lovezhangchuangxin',
    },

    search: {
      provider: 'local',
    },

    lastUpdated: {
      text: '最近更新于',
    },
  },
})

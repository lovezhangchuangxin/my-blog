<script setup lang="ts">
import { useData } from 'vitepress'
import { data } from './articles.data'

const { site, page } = useData()
const base = site.value.base
const getUrl = (url: string) => `${base}${url.slice(1)}`

const __fileurl = '/' + page.value.relativePath.replace(/\.md$/, '.html')
const articles = data.filter(({ url }) => url !== '/' && url !== __fileurl)

const getTitle = (url: string) => {
  const names = url.split('/')
  let filename = names.pop()!
  if(!filename) {
    filename = names.pop()!
  }
  const title = filename.replace(/\.html$/, '')
  if (title === 'index') return names.pop()
  return title
}
</script>

<h1>所有的文章</h1>
<ul>
  <li v-for="{ url } of articles">
    <a :href="getUrl(url)">{{ getTitle(url) }}</a>
  </li>
</ul>

## 待写文章

- LHS 和 RHS
- 闭包
- CSS 包含块

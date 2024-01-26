// vitepress相关工具方法

import { resolve } from 'node:path'
import { docsPath } from './paths'
import { readdir } from 'node:fs/promises'

/**
 * 根据相对路径获取侧边栏的配置
 */
export const getSidebar = async (relPath: string) => {
  const absPath = resolve(docsPath, relPath)
  const files = await readdir(absPath)
  const filenames = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -3))
  return {
    [`/${relPath}/`]: filenames
      .map((filename) => {
        return {
          text: filename,
          link: `/${relPath}/${filename}`,
        }
      })
      .filter(Boolean),
  }
}

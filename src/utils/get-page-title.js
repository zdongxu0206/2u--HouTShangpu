import defaultSettings from '@/settings'

const title = defaultSettings.title || '2U商城-商铺管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

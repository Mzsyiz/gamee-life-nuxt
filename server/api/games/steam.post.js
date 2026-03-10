export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const appId = String(body?.appId || '').trim()

  if (!/^\d+$/.test(appId)) {
    throw createError({
      statusCode: 400,
      message: 'appId 缺失或格式非法'
    })
  }

  try {
    const response = await $fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&l=schinese`)
    const appData = response?.[appId]

    if (!appData || appData.success !== true || !appData.data) {
      throw createError({
        statusCode: 404,
        message: '未找到对应的 Steam 游戏'
      })
    }

    const data = appData.data
    const title = String(data.name || '').trim()
    const cover = String(data.header_image || '').trim()
    const shortDescription = String(data.short_description || '').trim()
    const detailedDescription = String(data.detailed_description || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim()
    const description = shortDescription || detailedDescription || ''

    if (!title || !cover) {
      throw createError({
        statusCode: 502,
        message: 'Steam 返回的数据不完整'
      })
    }

    return {
      title,
      cover,
      description,
      steamId: appId
    }
  } catch (error) {
    if (error?.statusCode) {
      throw error
    }

    console.error('获取 Steam 游戏信息失败:', error)
    throw createError({
      statusCode: 502,
      message: 'Steam 服务请求失败，请稍后重试'
    })
  }
})

export function isUrl(url) {
  try {
    let isUrl = new URL(url)
    if(isUrl) {
      return true
    }
  } catch (error) {
    return false
  }
}
/**
 * サポートするソーシャルメディアプラットフォーム
 */
export type SocialMediaPlatform = 'twitter' | 'x' | 'facebook' | 'threads' | 'linkedin';

/**
 * ホスト名からソーシャルメディアプラットフォームを検出
 */
export function detectSocialPlatform(hostname: string): SocialMediaPlatform | null {
  if (hostname.includes('twitter.com')) {
    return 'twitter';
  }
  
  if (hostname.includes('x.com')) {
    return 'x';
  }
  
  if (hostname.includes('facebook.com')) {
    return 'facebook';
  }
  
  if (hostname.includes('threads.net')) {
    return 'threads';
  }
  
  if (hostname.includes('linkedin.com')) {
    return 'linkedin';
  }
  
  return null;
}

/**
 * 設定に基づいてプラットフォームが有効かどうかを確認
 */
export async function isPlatformEnabled(platform: SocialMediaPlatform): Promise<boolean> {
  try {
    const settings = await chrome.storage.sync.get('enabledPlatforms');
    const enabledPlatforms = settings.enabledPlatforms || {
      twitter: true,
      x: true,
      facebook: true,
      threads: true,
      linkedin: true
    };
    
    return !!enabledPlatforms[platform];
  } catch (error) {
    console.error('設定取得エラー:', error);
    // デフォルトですべて有効
    return true;
  }
}
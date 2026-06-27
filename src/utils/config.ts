import { getCollection } from 'astro:content';

export async function getSiteConfig() {
  // 优先使用 config.multivac.yaml（个人配置，通常 gitignore）
  // 回退到 config.example.yaml（仓库默认配置）
  const entries = await getCollection('config');
  const multivac = entries.find(e => e.id === 'configmultivac');
  const example = entries.find(e => e.id === 'configexample');
  const entry = multivac || example;
  if (!entry) throw new Error('Site config not found: config.example.yaml or config.multivac.yaml is missing');
  return entry.data;
}

export type SiteConfig = Awaited<ReturnType<typeof getSiteConfig>>;

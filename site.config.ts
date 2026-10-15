export interface CollectionConfig {
  id: string;
  title: string;
  description: string;
  order: number;
  sectionMode?: 'flat' | 'collapsible';
  notice?: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

export const site = {
  title: '知识笔记',
  description: '专注于知识沉淀、技术架构与系统化文档对外展示。',
  author: 'Your name',
  url: 'https://ljxpython.github.io',
  base: '/knowledge-site-template',
  repositoryUrl: 'https://github.com/ljxpython/knowledge-site-template',
  accent: {
    primary: '#a56a15',
    soft: '#f4e8d3',
  },
  navigation: {
    label: '知识笔记',
    sourceLabel: '查看源码',
  },
  links: {
    github: 'https://github.com/ljxpython/knowledge-site-template',
  },
  collections: [
    {
      id: 'foundations',
      title: '核心认知',
      description: '从思维模型与最小可用实践开始，理清脉络。',
      order: 1,
      sectionMode: 'collapsible' as const,
      sourceLabel: '查看源码',
      sourceUrl: 'https://github.com/ljxpython/knowledge-site-template',
      notice: '示例代码仅供学习参考。若要在本地测试，请手动执行相应命令。',
    },
    {
      id: 'practice',
      title: '工程实践',
      description: '将实践经验转化为可复现的高质量工作流。',
      order: 2,
      sectionMode: 'flat' as const,
      sourceLabel: '查看源码',
      sourceUrl: 'https://github.com/ljxpython/knowledge-site-template',
    },
  ],
} as const;

export default site;

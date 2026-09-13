import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { WhatsNew } from '@/components/whats-new';

export default async function Layout({ children }: LayoutProps<'/docs'>) {
  const tree = {
    ...source.pageTree,
    children: source.pageTree.children.filter(
      (node) => !(node.type === 'page' && node.url === '/docs/whats-new'),
    ),
  };

  return (
    <DocsLayout tree={tree} {...(await baseOptions())} sidebar={{ banner: <WhatsNew /> }}>
      {children}
    </DocsLayout>
  );
}

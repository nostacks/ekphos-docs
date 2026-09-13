import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { getRepoInfo, GITHUB_URL } from '@/lib/github';

export async function baseOptions(): Promise<BaseLayoutProps> {
  const { version } = await getRepoInfo();

  return {
    nav: {
      title: (
        <div className="flex items-center gap-2.5">
          <Logo className="size-3.5 text-fd-primary" />
          <span className="font-medium">ekphos</span>
          {version ? (
            <span className="border border-fd-border px-1.5 py-0.5 text-xs text-fd-muted-foreground">
              {version}
            </span>
          ) : null}
        </div>
      ),
    },
    githubUrl: GITHUB_URL,
  };
}

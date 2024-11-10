'use client';
import LanguageSelector from '@/components/language-selector/language-selector';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export type AppShellProps = {
    links: {
        name: string;
        url: string;
    }[];
};

export function AppShell(props: React.PropsWithChildren<AppShellProps>) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const t = useTranslations();
    const locale = useLocale();

    const setLang = (nextLocale: string) => {
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: nextLocale },
        );
    };

    return (
        <div className="h-full flex flex-col">
            <header className="border-b flex justify-between items-center p-2 gap-2">
                <nav className="flex h-16 px-4 items-center p-2 max-w-7xl lg:px-8">
                    <Link
                        href="/"
                        className="mr-12">
                        <Image
                            src="/images/logo.png"
                            height={34}
                            width={164}
                            alt="HK Foods"></Image>
                    </Link>
                    <ul className="flex list-none gap-8">
                        {props.links.map((link) => (
                            <li
                                key={link.url}
                                className="mt-2">
                                <Link
                                    href={link.url}
                                    className="hover:text-primary font-semibold">
                                    {t('NAV_' + link.name.toUpperCase())}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <LanguageSelector
                    lang={locale}
                    setLang={setLang}
                />
            </header>
            <main className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden isolate">
                <div className="flex-1 w-full p-6 mx-auto max-w-[90rem] lg:px-8">{props.children}</div>
            </main>
        </div>
    );
}

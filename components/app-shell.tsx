import Image from "next/image";
import Link from "next/link";

export type AppShellProps = {
  links: {
    name: string;
    url: string;
  }[];
};

export function AppShell(props: React.PropsWithChildren<AppShellProps>) {
  return (
    <div className="h-full flex flex-col">
      <header className="border-b">
        <nav className="flex h-16 px-4 items-center w-full p-6 mx-auto max-w-7xl lg:px-8">
          <Link href="/" className="mr-12">
            <Image
              src="/images/logo.png"
              height={34}
              width={164}
              alt="HK Foods"
            ></Image>
          </Link>
          <ul className="flex list-none gap-8">
            {props.links.map((link) => (
              <li key={link.url} className="pt-2">
                <Link
                  href={link.url}
                  className="hover:text-primary font-semibold leading-[4rem]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden isolate">
        <div className="flex-1 w-full p-6 mx-auto max-w-7xl lg:px-8">
          {props.children}
        </div>
      </main>
    </div>
  );
}

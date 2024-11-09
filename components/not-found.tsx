import { H1, P } from './ui/typography';

export function NotFound() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <H1>404</H1>
            <P>Not found</P>
        </div>
    );
}

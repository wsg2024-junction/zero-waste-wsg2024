import { NotFound } from '@/components/not-found';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function NotFoundPage() {
    return <NotFound></NotFound>;
}

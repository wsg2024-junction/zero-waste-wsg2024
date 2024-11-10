import { PropsWithChildren } from 'react';
import './styles.css';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout(props: PropsWithChildren) {
    return props.children;
}

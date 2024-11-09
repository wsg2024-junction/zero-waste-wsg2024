import { PropsWithChildren } from 'react';

export function DashboardTitle(props: PropsWithChildren) {
    return <h2 className={'text-xl'}>{props.children}</h2>;
}

import localFont from 'next/font/local';

export const avenir = localFont({
    adjustFontFallback: 'Arial',
    display: 'auto',
    src: [
        {
            path: './AvenirLTStd-Black.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './AvenirLTStd-BlackOblique.otf',
            weight: '800',
            style: 'italic',
        },
        {
            path: './AvenirLTStd-Book.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './AvenirLTStd-BookOblique.otf',
            weight: '300',
            style: 'italic',
        },
        {
            path: './AvenirLTStd-Heavy.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: './AvenirLTStd-HeavyOblique.otf',
            weight: '900',
            style: 'italic',
        },
        {
            path: './AvenirLTStd-Light.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: './AvenirLTStd-LightOblique.otf',
            weight: '200',
            style: 'italic',
        },
        {
            path: './AvenirLTStd-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './AvenirLTStd-MediumOblique.otf',
            weight: '500',
            style: 'italic',
        },
        {
            path: './AvenirLTStd-Roman.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './AvenirLTStd-Oblique.otf',
            weight: '400',
            style: 'italic',
        },
    ],
});

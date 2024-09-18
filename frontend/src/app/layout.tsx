// src/app/layout.tsx

import '../styles/globals.scss'; // Import global styles
import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <head>
                <title>Gym Manager</title>
            </head>
            <body>
                {children} {/* This renders the page content */}
            </body>
        </html>
    );
}

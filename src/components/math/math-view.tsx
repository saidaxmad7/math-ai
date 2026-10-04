'use client';

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type MathViewProps = {
    content: string;
    className?: string;
};

export function MathView({ content, className = '' }: MathViewProps) {
    if (!content) return null;

    // Split content by display math $$...$$ and inline math $...$
    // Regex matches $$...$$ or $...$
    const parts: React.ReactNode[] = [];
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
        // Plain text before match
        if (match.index > lastIndex) {
            parts.push(
                <span key={`text-${lastIndex}`}>
                    {content.substring(lastIndex, match.index)}
                </span>,
            );
        }

        const rawMath = match[0];
        const isBlock = rawMath.startsWith('$$');
        const formula = isBlock
            ? rawMath.slice(2, -2).trim()
            : rawMath.slice(1, -1).trim();

        try {
            const html = katex.renderToString(formula, {
                displayMode: isBlock,
                throwOnError: false,
            });

            if (isBlock) {
                parts.push(
                    <div
                        key={`math-${match.index}`}
                        className='my-3 flex justify-center overflow-x-auto py-2'
                        dangerouslySetInnerHTML={{ __html: html }}
                    />,
                );
            } else {
                parts.push(
                    <span
                        key={`math-${match.index}`}
                        className='inline-block px-1'
                        dangerouslySetInnerHTML={{ __html: html }}
                    />,
                );
            }
        } catch {
            parts.push(<code key={`err-${match.index}`}>{rawMath}</code>);
        }

        lastIndex = match.index + rawMath.length;
    }

    if (lastIndex < content.length) {
        parts.push(
            <span key={`text-${lastIndex}`}>
                {content.substring(lastIndex)}
            </span>,
        );
    }

    return <div className={`math-content ${className}`}>{parts}</div>;
}

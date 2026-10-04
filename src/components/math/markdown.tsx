'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

import { MathView } from './math-view';

type MarkdownProps = {
    content: string;
};

function renderMathNodes(children: React.ReactNode): React.ReactNode {
    if (typeof children === 'string') {
        if (children.includes('$')) {
            return <MathView content={children} className='inline' />;
        }
        return children;
    }

    if (Array.isArray(children)) {
        return React.Children.map(children, renderMathNodes);
    }

    if (React.isValidElement(children)) {
        const props = children.props as { children?: React.ReactNode };
        if (props && props.children) {
            return React.cloneElement(
                children,
                undefined,
                renderMathNodes(props.children),
            );
        }
    }

    return children;
}

export function Markdown({ content }: MarkdownProps) {
    if (!content) return null;

    return (
        <article className='prose prose-neutral dark:prose-invert max-w-none text-foreground'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p({ children }) {
                        return <div className='my-4 leading-relaxed'>{renderMathNodes(children)}</div>;
                    },
                    li({ children }) {
                        return <li className='my-1.5'>{renderMathNodes(children)}</li>;
                    },
                    h1({ children }) {
                        return <h1 className='mt-8 mb-4 font-heading text-2xl font-bold tracking-tight text-foreground'>{renderMathNodes(children)}</h1>;
                    },
                    h2({ children }) {
                        return <h2 className='mt-6 mb-3 font-heading text-xl font-bold tracking-tight text-foreground border-b pb-2'>{renderMathNodes(children)}</h2>;
                    },
                    h3({ children }) {
                        return <h3 className='mt-5 mb-2 font-heading text-lg font-semibold text-foreground'>{renderMathNodes(children)}</h3>;
                    },
                    strong({ children }) {
                        return <strong className='font-bold text-foreground'>{renderMathNodes(children)}</strong>;
                    },
                    em({ children }) {
                        return <em className='italic text-foreground/90'>{renderMathNodes(children)}</em>;
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote className='my-5 rounded-xl border-l-4 border-primary/60 bg-primary/5 p-4 text-foreground/90 not-italic shadow-xs'>
                                {renderMathNodes(children)}
                            </blockquote>
                        );
                    },
                    table({ children }) {
                        return (
                            <div className='my-6 overflow-x-auto rounded-xl border bg-card shadow-xs'>
                                <table className='w-full border-collapse text-left text-sm'>
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    th({ children }) {
                        return (
                            <th className='border-b bg-muted/60 px-4 py-3 font-semibold text-foreground'>
                                {renderMathNodes(children)}
                            </th>
                        );
                    },
                    td({ children }) {
                        return (
                            <td className='border-b border-border/50 px-4 py-3 text-muted-foreground'>
                                {renderMathNodes(children)}
                            </td>
                        );
                    },
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const lang = match ? match[1].toLowerCase() : '';
                        const codeString = String(children).trim();

                        // Render embedded SVG diagrams nicely
                        if (lang === 'svg' || (codeString.startsWith('<svg') && codeString.endsWith('</svg>'))) {
                            return (
                                <div className='my-6 flex flex-col items-center justify-center rounded-2xl border bg-card/60 p-5 shadow-xs'>
                                    <div
                                        className='w-full max-w-3xl flex justify-center overflow-x-auto [&>svg]:max-w-full [&>svg]:h-auto'
                                        dangerouslySetInnerHTML={{ __html: codeString }}
                                    />
                                </div>
                            );
                        }

                        return (
                            <code
                                className='rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground'
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "Math AI — Sun'iy intellekt bilan matematika o'rganish";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #09090b 0%, #150d2a 50%, #0a1128 100%)',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                    padding: '40px 60px',
                }}
            >
                {/* Decorative background glow circles */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '15%',
                        width: '450px',
                        height: '450px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-10%',
                        right: '15%',
                        width: '450px',
                        height: '450px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />

                {/* Math watermark symbols in background */}
                <div
                    style={{
                        position: 'absolute',
                        top: '40px',
                        right: '70px',
                        fontSize: '70px',
                        fontWeight: 'bold',
                        color: 'rgba(255, 255, 255, 0.08)',
                    }}
                >
                    f(x) = ax² + bx + c
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: '70px',
                        fontSize: '60px',
                        fontWeight: 'bold',
                        color: 'rgba(255, 255, 255, 0.08)',
                    }}
                >
                    ∫ π r² • ∑ xᵢ
                </div>

                {/* Brand Badge */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 24px',
                        borderRadius: '9999px',
                        background: 'rgba(168, 85, 247, 0.15)',
                        border: '1.5px solid rgba(192, 132, 252, 0.35)',
                        marginBottom: '24px',
                    }}
                >
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: '#10b981',
                        }}
                    />
                    <span
                        style={{
                            color: '#e9d5ff',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                        }}
                    >
                        Math AI 2.0 • 9–11-sinflar uchun innovatsion ta&apos;lim
                    </span>
                </div>

                {/* Main Heading */}
                <h1
                    style={{
                        fontSize: '62px',
                        fontWeight: 800,
                        textAlign: 'center',
                        color: '#ffffff',
                        lineHeight: 1.15,
                        margin: '0 0 20px 0',
                        maxWidth: '1000px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <span>Sun&apos;iy intellekt yordamida</span>
                    <span
                        style={{
                            background: 'linear-gradient(90deg, #c084fc, #f472b6, #818cf8)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        matematikani oson o&apos;rganing
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: '24px',
                        color: '#cbd5e1',
                        textAlign: 'center',
                        maxWidth: '850px',
                        lineHeight: 1.45,
                        margin: '0 0 36px 0',
                    }}
                >
                    Shaxsiy AI repetitor • Davlat darsliklari tahlili • Interaktiv mashqlar va testlar
                </p>

                {/* Feature Chips */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 600,
                        }}
                    >
                        📐 9, 10, 11-sinf darsliklari
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            background: 'rgba(168, 85, 247, 0.15)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            color: '#e9d5ff',
                            fontSize: '18px',
                            fontWeight: 600,
                        }}
                    >
                        🤖 24/7 AI Repetitor
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            color: '#ffffff',
                            fontSize: '18px',
                            fontWeight: 600,
                        }}
                    >
                        🇺🇿 O&apos;zbek va Ingliz tillarida
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

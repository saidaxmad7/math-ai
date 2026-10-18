import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/features/home/components/hero";
import { Features } from "@/features/home/components/features";

export default function HomePage() {
    return (
        <div className='relative min-h-screen bg-[#070913] text-foreground selection:bg-violet-500/30 selection:text-white overflow-x-hidden'>
            {/* Global Continuous Background Lighting & Mathematical Grid */}
            <div className='fixed inset-0 pointer-events-none -z-10 overflow-hidden'>
                {/* Deep cosmic gradient mesh */}
                <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[750px] bg-gradient-to-tr from-violet-600/30 via-indigo-600/25 to-fuchsia-600/20 blur-[150px] rounded-full' />
                <div className='absolute top-[35%] -left-32 w-[600px] h-[600px] bg-indigo-600/20 blur-[140px] rounded-full' />
                <div className='absolute top-[55%] -right-32 w-[650px] h-[650px] bg-violet-600/20 blur-[150px] rounded-full' />
                <div className='absolute -bottom-20 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-fuchsia-600/15 blur-[160px] rounded-full' />

                {/* Subtle mathematical blueprint grid */}
                <div className='absolute inset-0 top-16 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_35%,#000_70%,transparent_100%)]' />

                {/* Dot matrix constellation accent */}
                <div className='absolute inset-0 top-16 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60' />
            </div>

            <Navbar />
            <main>
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    );
}

export default function SkeletonCardProduct() {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/10 backdrop-blur-xl p-6 animate-pulse">
            {/* Image Placeholder */}
            <div className="relative rounded-2xl aspect-4/3 w-full bg-white/5 mb-6"></div>

            {/* Subtitle Placeholder */}
            <div className="h-3 w-16 bg-white/5 rounded-md mb-3"></div>

            {/* Title Placeholder */}
            <div className="h-6 w-3/4 bg-white/10 rounded-md mb-2"></div>

            {/* Description Placeholder */}
            <div className="h-4 w-1/2 bg-white/5 rounded-md mb-6"></div>

            {/* Price & Action Button Placeholder */}
            <div className="flex items-center justify-between mt-4">
                <div className="h-5 w-20 bg-white/10 rounded-md"></div>
                <div className="h-10 w-10 rounded-full bg-white/5"></div>
            </div>
        </div>
    );
}
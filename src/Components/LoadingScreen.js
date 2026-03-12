import Link from "next/link";

export default function ArtDistrictLanding() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      
      {/* Animated geometric shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-6 animate-fade-in-up">
          <h1 className="font-light text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-slate-900 leading-tight">
            ART DISTRICT
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold italic text-slate-600">
            Everyone Speaks Art
          </p>
          
          {/* Optional CTA */}
          <div className="pt-8">
            <Link
                href="/HomePage"
                className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 inline-block"
              >
                Explore Now
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(20px) scale(0.95);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
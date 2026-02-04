import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-green-900 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=800&fit=crop"
            alt="Golf course background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome to DivotTrack</h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8">Track your golf game, improve your score, and connect with players worldwide</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/member" 
              className="px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
            >
              View My Rounds
            </Link>
            <Link 
              href="/course-finder" 
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 text-lg border-2 border-white"
            >
              Find a Course
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose DivotTrack?</h2>
          <p className="text-center text-gray-600 text-lg mb-16">Everything you need to track, analyze, and improve your golf game</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop"
                  alt="Track Your Rounds"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Your Rounds</h3>
                <p className="text-gray-600">Record every shot, track your progress, and analyze your performance with detailed statistics and insights.</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1511028997589-c1400149cccd?w=400&h=300&fit=crop"
                  alt="Find Courses"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Courses</h3>
                <p className="text-gray-600">Discover golf courses near you, compare facilities, and book your next round with ease.</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop"
                  alt="Connect with Players"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect with Players</h3>
                <p className="text-gray-600">Join a community of golfers, compete with friends, and share your best moments on the course.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8 bg-green-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-white mb-2">10K+</p>
              <p className="text-green-100 text-lg">Active Players</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-white mb-2">500+</p>
              <p className="text-green-100 text-lg">Courses Listed</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-white mb-2">1M+</p>
              <p className="text-green-100 text-lg">Rounds Tracked</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Improve Your Game?</h2>
          <p className="text-gray-600 text-lg mb-8">Join thousands of golfers who are already using DivotTrack to track their progress and connect with the golfing community.</p>
          
          <Link 
            href="/create-account" 
            className="inline-block px-10 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300 text-lg"
          >
            Create Your Account Today
          </Link>
        </div>
      </section>
    </main>
  );
}
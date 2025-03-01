import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-24 flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to VarFit</h1>
        <p className="text-lg mb-8 text-center max-w-2xl">
          Your fitness journey starts here. Track workouts, plans, and progress all in one place.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Track Your Workouts</h3>
            <p className="text-gray-700">
              Log and track your workouts with ease, and stay motivated.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Personalized Plans</h3>
            <p className="text-gray-700">
              Get customized workout and diet plans tailored to your goals.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Monitor Your Progress</h3>
            <p className="text-gray-700">
              See how far you’ve come with detailed progress tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-4 mt-auto text-center">
        <p>&copy; 2025 VarFit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen mt-21 bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16 flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to FitTrack</h1>
        <p className="text-lg mb-8 text-center max-w-2xl">
          Start your fitness transformation today. Keep track of your workouts and progress all in one place!
        </p>
      </section>

      {/* Features Section */}
      <section className="py-8 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Log Your Workouts</h3>
            <p className="text-gray-700">
              Effortlessly log and monitor your workouts. Stay on track with your fitness goals.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Custom Fitness Plans</h3>
            <p className="text-gray-700">
              Receive personalized workout plans designed specifically for you.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Track Your Progress</h3>
            <p className="text-gray-700">
              Stay motivated by tracking your progress over time. See the results of your hard work!
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-4 mt-auto text-center">
        <p>&copy; 2025 FitTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

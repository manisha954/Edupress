// pages/index.js
import Head from "next/head";

const categories = [
  { name: "Art & Design", icon: "🎨", courses: 38 },
  { name: "Development", icon: "💻", courses: 38 },
  { name: "Communication", icon: "🔄", courses: 38 },
  { name: "Videography", icon: "🎥", courses: 38 },
  { name: "Photography", icon: "📷", courses: 38 },
  { name: "Marketing", icon: "📊", courses: 38 },
  { name: "Content Writing", icon: "📝", courses: 38 },
  { name: "Finance", icon: "💰", courses: 38 },
  { name: "Science", icon: "🔬", courses: 38 },
  { name: "Network", icon: "🌐", courses: 38 },
];

export default function TopCategories() {
  return (
    <div className="px-4 md:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="md:text-3xl text-2xl font-semibold mb-2">
              Top Categories
            </h1>
            <p className="text-gray-600 text-sm mb-4 md:mb-10">
              Explore our Popular Categories
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <button className="border-2 hover:bg-orange-500 hover:text-white border-orange-500 text-gray-700 font-semibold text-sm px-7 py-3 rounded-full mb-4 md:mb-0">
              All Categories
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="py-10 border border-gray-300 hover:shadow-lg rounded-xl transform transition-transform duration-300 hover:-translate-y-3 text-center"
            >
              <div className="text-3xl mb-4">{category.icon}</div>
              <h2 className="text-base font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600 text-sm">
                {category.courses} Courses
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="bg-gray-800 rounded-full w-32 h-32 flex justify-center items-center mx-auto mb-8">
          <h1 className="text-4xl font-bold text-white">404</h1>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-semibold">Look like you're lost</h3>
          <p className="text-gray-700">The page you are looking for is not available!</p>
        </div>

        <NavLink to="/" className="text-blue-500 font-semibold hover:underline">
          Go to Home
        </NavLink>
      </div>
    </section>
  );
}

export default ErrorPage;

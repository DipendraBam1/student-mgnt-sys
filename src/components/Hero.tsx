export default function Hero() {
  return (
    <div className="max-w-2xl flex-1">
      
      <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
        Every Student,
        <br />
        One Place with{" "}
        <span className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
          Academia
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey">
        Track attendance, grades, and classroom notes in one dashboard.
        Simplify record-keeping and give teachers more time to teach.
      </p>

      <button className="mt-8 rounded-full bg-gradient-to-r from-accent-from to-accent-to px-8 py-3.5 text-base font-bold text-white transition hover:opacity-90">
        Get Started
      </button>
    </div>
  );
}
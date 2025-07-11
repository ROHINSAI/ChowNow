function InfoComponent({ info }) {
  return (
    <div className="bg-[#1C1C1C] text-white p-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-300 text-base leading-relaxed">
          {info}
        </p>
      </div>
    </div>
  );
}

export default InfoComponent;

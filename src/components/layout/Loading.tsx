export const Loading = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center z-[1] `}
    >
      <span className=" sr-only ">Loading...</span>
      <div className="flex gap-x-4">
        <div className="h-10 w-10 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-10 w-10 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-10 w-10 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

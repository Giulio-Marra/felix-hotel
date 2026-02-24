import { FallingLines } from "react-loader-spinner";

const MyLoader = (props: { text: string }) => {
  const { text } = props;
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <FallingLines
          color="#d97706"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
        <p className="mt-4 text-amber-600 font-medium tracking-widest animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MyLoader;

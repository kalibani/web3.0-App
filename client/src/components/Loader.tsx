import { FunctionComponent } from "react";
interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
  return (
    <div className="flex items-center justify-center py-3">
      <div className="w-32 h-32 border-b-2 border-red-700 rounded-full animate-spin" />
    </div>
  );
};

export default Loader;

import { FunctionComponent } from "react";
import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      {/* <Footer />  */}
    </div>
  );
};

export default App;

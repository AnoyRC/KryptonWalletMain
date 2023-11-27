"use client";

import { Card } from "@material-tailwind/react";
import Spline from "@splinetool/react-spline";

export default function DashboardHolder({ children }) {
  return (
    <div className="w-full h-full pt-3 pb-6 ">
      <Card className="w-full h-full overflow-hidden shadow-none relative bg-transparent">
        <div className="w-full h-full absolute top-0 left-0 ">
          <Spline
            scene="https://prod.spline.design/E9D5dTHMhglFtefw/scene.splinecode"
            className="flex items-center justify-center"
          />
        </div>
        {/* <div className="w-full h-full absolute bg-[#faebe8]/80 top-0 left-0 backdrop-blur-md"></div> */}
        {children}
      </Card>
    </div>
  );
}

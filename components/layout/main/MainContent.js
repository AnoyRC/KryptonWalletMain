'use client';

import Spline from '@splinetool/react-spline';

export default function MainContent() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="h-[800px] w-full">
        <Spline scene="https://prod.spline.design/FdZKNHJSN2X0jLnc/scene.splinecode" />
      </div>
    </div>
  );
}

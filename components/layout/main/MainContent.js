import Image from "next/image";

export default function MainContent() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="h-[700px] w-[7000px] relative">
        <Image
          src="/images/main/bg.png"
          fill
          alt="Landing Page"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

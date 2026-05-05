import Image from "next/image";

export default function AvatarRing({ user }: { user: User }) {
  return (
    <div className="flex justify-center mt-2 sm:mt-4">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background">
        <Image
          src={user.avatarUrl}
          alt={user.displayName}
          fill
          priority 
          sizes="(max-width: 768px) 80px, (max-width: 1200px) 120px, 150px"
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
}

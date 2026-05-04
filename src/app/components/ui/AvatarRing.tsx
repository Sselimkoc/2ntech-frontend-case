import Image from "next/image";

export default function AvatarRing({ user }: { user: User }) {
  return (
    <div className="flex justify-center mt-2 sm:mt-4">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background">
        <Image
          src={user.avatarUrl}
          alt={`${user.displayName} profil fotoğrafı`}
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
          priority
        />
      </div>
    </div>
  );
}

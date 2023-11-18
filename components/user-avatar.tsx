import { Avatar, AvatarImage } from "@/components/ui/avatar"

type UserAvatarProps = {
  src?: string
  className?: string
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
    </Avatar>
  )
}

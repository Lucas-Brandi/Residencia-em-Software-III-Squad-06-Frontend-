import * as React from 'react';
import { UserCircle } from 'lucide-react';
import type { User } from '@/types/user';

interface ProfileAvatarProps {
  user: User;
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  const [avatarError, setAvatarError] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-2 pt-1">
      {!avatarError && user.githubUsername ? (
        <img
          src={`https://github.com/${user.githubUsername}.png?size=96`}
          alt={user.username}
          className="w-20 h-20 rounded-full object-cover border-2 border-border"
          onError={() => setAvatarError(true)}
        />
      ) : (
        <div
          className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center"
          style={{ backgroundColor: '#0f1c26' }}
        >
          <UserCircle size={48} className="text-muted-foreground" />
        </div>
      )}

      <span className="text-xs text-muted-foreground">
        @{user.githubUsername ?? user.username}
      </span>

      <span className="text-xs text-muted-foreground capitalize">
        {user.role}
      </span>
    </div>
  );
}

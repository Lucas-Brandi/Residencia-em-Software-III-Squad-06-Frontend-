import { Eye, ShieldCheck, Code2 } from 'lucide-react';
import { RoleUsuario } from '@/types/admin';

interface RoleBadgeProps {
  role: RoleUsuario;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const getIcon = () => {
    switch (role) {
      case 'Reviewer':
        return <Eye className="h-4 w-4" />;
      case 'Admin':
        return <ShieldCheck className="h-4 w-4" />;
      case 'Dev':
        return <Code2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      {getIcon()}
      {role}
    </div>
  );
}

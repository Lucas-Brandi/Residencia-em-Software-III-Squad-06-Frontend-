import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  GitPullRequest,
  ListChecks,
  Settings,
  UserCircle,
  X,
} from "lucide-react"

const navItems = [
  { title: "Dashboard",     href: "/dashboard",  icon: LayoutDashboard },
  { title: "Pull Requests", href: "/prs",         icon: GitPullRequest  },
  { title: "Regras",        href: "/regras",      icon: ListChecks      },
  { title: "Administração", href: "/admin",       icon: Settings        },
]

interface AppSidebarProps {
  activePath?: string
}

export function AppSidebar({ activePath = "/dashboard" }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsible="offcanvas" className="border-none">

      <SidebarHeader className="flex flex-row items-center justify-between px-5 py-5">
        <span className="text-base font-semibold tracking-wide">
          DiffyAI
        </span>
        <button
          onClick={toggleSidebar}
          className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
        >
          <X size={16} />
        </button>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-1">
        <SidebarMenu>
          {navItems.map(({ title, href, icon: Icon }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton
                asChild
                isActive={activePath === href}
                className="gap-3 h-11 px-3 rounded-lg text-sm font-medium
                  text-sidebar-foreground/60
                  hover:text-sidebar-foreground hover:bg-sidebar-accent
                  data-[active=true]:text-sidebar-foreground data-[active=true]:bg-sidebar-accent"
              >
                <a href={href}>
                  <Icon size={18} strokeWidth={1.75} />
                  <span>{title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activePath === "/perfil"}
              className="gap-3 h-11 px-3 rounded-lg text-sm font-medium
                text-sidebar-foreground/60
                hover:text-sidebar-foreground hover:bg-sidebar-accent
                data-[active=true]:text-sidebar-foreground data-[active=true]:bg-sidebar-accent"
            >
              <a href="/perfil">
                <UserCircle size={18} strokeWidth={1.75} />
                <span>Perfil</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}
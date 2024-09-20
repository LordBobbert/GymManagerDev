import { List, ListItemText, Drawer, ListItemButton } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

// Define props interface to ensure href exists
interface ListItemLinkProps {
  href: string;
  children?: React.ReactNode;
}

// Use forwardRef to allow Next.js Link to be passed into ListItemButton correctly
const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(function ListItemLink(props, ref) {
  const { href, children, ...other } = props;
  return (
    <Link href={href} passHref>
      <a ref={ref} {...other}>
        {children}
      </a>
    </Link>
  );
});

interface SidebarProps {
  role: 'admin' | 'trainer' | 'client'; // Dynamic role prop
}

const Sidebar = ({ role }: SidebarProps) => {
  const getMenuItems = () => {
    switch (role) {
      case 'admin':
        return [
          { text: 'Home', href: '/admin/dashboard' },
          { text: 'Clients', href: '/admin/dashboard/clients' },
          { text: 'Trainers', href: '/admin/dashboard/trainers' },
          { text: 'Sessions', href: '/admin/dashboard/sessions' },
          { text: 'Calendar', href: '/admin/dashboard/calendar' },
          { text: 'Financials', href: '/admin/dashboard/financials' },
          { text: 'Chat', href: '/admin/dashboard/chat' },
        ];
      case 'trainer':
        return [
          { text: 'Home', href: '/trainer/dashboard' },
          { text: 'Sessions', href: '/trainer/dashboard/sessions' },
          { text: 'Calendar', href: '/trainer/dashboard/calendar' },
          { text: 'Chat', href: '/trainer/dashboard/chat' },
        ];
      case 'client':
        return [
          { text: 'Home', href: '/client/dashboard' },
          { text: 'My Sessions', href: '/client/dashboard/sessions' },
          { text: 'Calendar', href: '/client/dashboard/calendar' },
          { text: 'Profile', href: '/client/dashboard/profile' },
          { text: 'Chat', href: '/client/dashboard/chat' },
        ];
      default:
        return [];
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {getMenuItems().map((item) => (
          <ListItemButton key={item.text} component={ListItemLink} href={item.href}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

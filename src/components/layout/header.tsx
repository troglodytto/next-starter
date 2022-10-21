import {
  Button,
  IconButton,
  ButtonProps,
  Menu,
  Switch,
  Badge,
  Avatar,
  Input,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { FC, MouseEventHandler, ReactNode, useState } from 'react';
import { FiChevronDown, FiSearch, FiSettings } from 'react-icons/fi';
import {
  AiOutlineCodepen,
  AiOutlineNotification,
  AiOutlineCalendar,
  AiOutlineMessage,
} from 'react-icons/ai';
import { RiUser6Line, RiLogoutBoxRLine } from 'react-icons/ri';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import styled from 'styled-components';
import { WithChildren } from 'next-env';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  loginAction,
  logoutAction,
  setOnlineStatusAction,
} from 'app/store/features/auth.slice';

const AppHeaderNav = styled.nav`
  background-color: ${props => props.theme.primary};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  box-shadow: 0 0 2px grey;

  @media (max-width: 750px) {
    padding: 0.75rem;
  }
`;

const NavbarButton = styled(Button)`
  color: ${props => props.theme.primaryLight} !important;
  padding: 0.5rem 1rem !important;
  text-transform: none !important;
  font-size: 1rem !important;
`;

const SearchInput = styled(Input)`
  width: 30%;
  margin-inline: auto;
  color: ${props => props.theme.textDark} !important;
  border-radius: ${props => props.theme.borderRadius} !important;
  padding: 0.5rem;
  background: white;

  &:focus-within {
    box-shadow: 1px 1px 0.5rem ${props => props.theme.primaryDark};
  }

  &::before,
  &::after {
    display: none;
  }
`;

const SearchIcon = styled(FiSearch)`
  color: ${props => props.theme.primary};
  margin-right: 0.5rem;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  max-height: 30rem;
  padding: 0.5rem 1rem;
`;

const MenuButton = styled(Button)`
  justify-content: left !important;
  padding: 1rem !important;

  &:hover {
    background-color: ${props => props.theme.primaryLight} !important;
    color: ${props => props.theme.primaryDark} !important;
  }
`;

interface DropdownProps {
  label: ReactNode;
}
const DropdownMenu: FC<WithChildren & ButtonProps & DropdownProps> = ({
  children,
  endIcon,
  label,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <NavbarButton
        variant="text"
        color="inherit"
        endIcon={endIcon}
        onClick={onClick}>
        {label}
      </NavbarButton>
      <Menu open={!!anchorEl} onClose={onClose} anchorEl={anchorEl}>
        <DropdownList onClick={onClose}>{children}</DropdownList>
      </Menu>
    </>
  );
};

const AuthHeader: FC = () => {
  const { isAuthorized, profileImage, username, isOnline, isLoading } =
    useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const onLogin = async () => {
    dispatch(loginAction());
  };

  return isAuthorized ? (
    <>
      <Link href="/direct">
        <IconButton>
          <Badge
            badgeContent={4}
            color="secondary"
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <AiOutlineMessage color="#b2e0f7" size={24} />
          </Badge>
        </IconButton>
      </Link>
      <DropdownMenu
        endIcon={<FiChevronDown />}
        label={
          <Avatar
            src={profileImage}
            sx={{ backgroundColor: '#b2e0f7', height: 36, width: 36 }}>
            {username.charAt(0)}
          </Avatar>
        }>
        <MenuButton
          fullWidth
          startIcon={<AiOutlineNotification />}
          onClick={() => dispatch(setOnlineStatusAction(!isOnline))}>
          Online Status
          <Switch checked={isOnline} sx={{ marginLeft: 'auto' }} />
        </MenuButton>
        <MenuButton fullWidth startIcon={<MdOutlineNotificationsActive />}>
          Notifications
        </MenuButton>
        <Link href="/">
          <MenuButton fullWidth startIcon={<RiUser6Line />}>
            Profile
          </MenuButton>
        </Link>
        <Link href="/">
          <MenuButton fullWidth startIcon={<FiSettings />}>
            Settings
          </MenuButton>
        </Link>

        <MenuButton
          fullWidth
          startIcon={<RiLogoutBoxRLine />}
          onClick={() => dispatch(logoutAction())}>
          Logout
        </MenuButton>
      </DropdownMenu>
    </>
  ) : (
    <IconButton color="primary" onClick={onLogin}>
      {isLoading ? (
        <CircularProgress style={{ color: '#b2e0f7' }} size={24} />
      ) : (
        <RiUser6Line color="#b2e0f7" size={24} />
      )}
    </IconButton>
  );
};

const AppHeader: FC = () => {
  return (
    <AppHeaderNav>
      <Link href="/">
        <IconButton color="primary">
          <AiOutlineCodepen color="#b2e0f7" size={36} />
        </IconButton>
      </Link>

      <DropdownMenu endIcon={<FiChevronDown />} label="Dropdown Menu">
        <Link href="/second">
          <MenuButton fullWidth startIcon={<AiOutlineCalendar />}>
            Dropdown Item
          </MenuButton>
        </Link>
      </DropdownMenu>

      <NavbarButton
        href="https://medium.com/blog"
        variant="text"
        color="inherit">
        Blog
      </NavbarButton>

      <SearchInput
        placeholder="Search Input.."
        startAdornment={<SearchIcon size={24} />}
      />

      <AuthHeader />
    </AppHeaderNav>
  );
};

export default AppHeader;

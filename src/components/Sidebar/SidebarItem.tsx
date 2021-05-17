import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';

const useStyles = makeStyles(({ palette }) => ({
  item: {
    border: '1px solid transparent',
    backgroundColor: ({ active }: any) =>
      active ? palette.primary.main : 'transparent',
    borderRadius: 12,
    padding: '12px 16px',
    margin: '2px 0',
    cursor: 'pointer',

    '&:hover': {
      border: ({ disabled }: any) =>
        disabled
          ? '1px solid transparent'
          : `1px solid ${palette.primary.main}`,

      '& $icon': {
        color: ({ disabled }: any) =>
          disabled ? palette.text.secondary : palette.text.primary,
      },

      '& $title': {
        color: ({ disabled }: any) =>
          disabled ? palette.text.secondary : palette.text.primary,
      },
    },
  },

  icon: {
    minWidth: 32,
    color: ({ active }: any) =>
      active ? palette.text.primary : palette.text.secondary,
  },

  title: {
    whiteSpace: 'nowrap',
    color: ({ active }: any) =>
      active ? palette.text.primary : palette.text.secondary,

    '&> span': {
      fontSize: 12,
    },
  },
}));

export interface SidebarItemProps {
  title: string;
  link: string;
  Icon: React.JSXElementConstructor<any>;
  href?: boolean;
  disabled?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  link,
  Icon,
  href = false,
  disabled = false,
}) => {
  const location = useLocation();
  const active = location.pathname === link;
  const classes = useStyles({ active, disabled });

  return (
    <ListItem
      disabled={disabled}
      className={cn(classes.item, { active })}
      {...(href
        ? {
            href: link,
            component: 'a',
            target: '_blank',
            referrer: 'noreferrer',
          }
        : {
            to: disabled ? location.pathname : link,
            component: NavLink,
            activeClassName: 'active',
          })}
    >
      <Hidden smDown>
        <ListItemIcon
          className={classes.icon}
          style={{ color: link === '/pbc' && !active ? 'orange' : undefined }}
        >
          <Icon fontSize='small' />
        </ListItemIcon>
      </Hidden>

      <Hidden mdUp>
        <Tooltip title={title}>
          <ListItemIcon
            className={classes.icon}
            style={{ color: link === '/pbc' && !active ? 'orange' : undefined }}
          >
            <Icon fontSize='small' />
          </ListItemIcon>
        </Tooltip>
      </Hidden>

      <Hidden smDown>
        <ListItemText
          style={{ color: link === '/pbc' && !active ? 'orange' : undefined }}
          className={classes.title}
        >
          {title}
        </ListItemText>
      </Hidden>
    </ListItem>
  );
};

export default SidebarItem;
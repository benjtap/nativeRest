import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { Audiodetails } from './componentsagi'

export const screens = {
  HomeTab: 'HomeTab',
  ContactStack: 'ContactStack',
  Contact: 'Contact',
  ACTION1: 'ACTION1',
  ACTION3: 'ACTION3',
  ACTION4: 'ACTION4',
  GROUPMEMBERS: 'GROUPMEMBERS',

  BookStack: 'BookStack',
  Audio: 'Audio',
  Audiodetails: 'Audiodetails',
  AudioGroupMembers: 'AudioGroupMembers',
  ContactStack: 'ContactStack',
  // Contact: 'www',
  MyRewardsStack: 'MyRewardsStack',
  MyRewards: 'MyRewards',
  LocationsStack: 'LocationsStack',
  Locations: 'Locations',
}

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'אנשי קשר',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.HomeTab,
    focusedRoute: screens.Contact,
    title: 'אנשי קשר',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'אנשי קשר',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'אנשי קשר',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.ACTION1,
    focusedRoute: screens.ContactStack,
    title: 'ייצוא רשימת אנשי קשר',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  
  {
    name: screens.ACTION3,
    focusedRoute: screens.ContactStack,
    title: 'יצירת קבוצה',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="teamspeak" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
 
  {
    name: screens.GROUPMEMBERS,
    focusedRoute: screens.ContactStack,
    title: 'GroupMembers',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="teamspeak" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },

  
  {
    name: screens.BookStack,
    focusedRoute: screens.BookStack,
    title: 'הקלטה',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
   {
    name: screens.Audio,
    focusedRoute: screens.BookStack,
    title: 'הקלטה',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.Action4,
    focusedRoute: screens.BookStack,
    title: 'הקלטה חדשה',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="teamspeak" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  // {
  //   name: screens.AudioGroupMembers,
  //   focusedRoute: screens.BookStack,
  //   title: 'הקלטה',
  //   showInTab: false,
  //   showInDrawer: false,
  //   icon: (focused) =>
  //     <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  // },
  // {
  //   name: screens.Audiodetails,
  //   focusedRoute: screens.BookStack,
  //   title: 'הקלטה',
  //   showInTab: false,
  //   showInDrawer: false,
  //   icon: (focused) =>
  //     <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  // },

  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'Contact Us',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="phone" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  // {
  //   name: screens.Contact,
  //   focusedRoute: screens.ContactStack,
  //   title: 'Contact Us',
  //   showInTab: false,
  //   showInDrawer: false,
  //   icon: (focused) =>
  //     <Icon name="phone" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  // },

  {
    name: screens.MyRewardsStack,
    focusedRoute: screens.MyRewardsStack,
    title: 'My Rewards',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="star" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.MyRewards,
    focusedRoute: screens.MyRewardsStack,
    title: 'My Rewards',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="star" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },

  {
    name: screens.LocationsStack,
    focusedRoute: screens.LocationsStack,
    title: 'Locations',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Locations,
    focusedRoute: screens.LocationsStack,
    title: 'Locations',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="map-marker" size={30} color={focused ? '#551E18' : '#000'} />,
  },
]

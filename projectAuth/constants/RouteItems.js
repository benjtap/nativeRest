import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { Audiodetails } from './componentsagi'

export const screens = {
  ContactTab: 'ContactTab',
  AuthStack: 'AuthStack',
  LOGIN: 'LOGIN',
  Contact: 'Contact',
  ACTION1: 'ACTION1',
  ACTION3: 'ACTION3',
  ACTION4: 'ACTION4',
  GROUPMEMBERS: 'GROUPMEMBERS',

  AudioStack: 'AudioStack',
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
    name: screens.ContactTab,
    focusedRoute: screens.ContactTab,
    title: 'אנשי קשר',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  {
    name: screens.ContactTabs,
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
    name: screens.LOGIN,
    focusedRoute: screens.AuthStack,
    title: '',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="users" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  
  {
    name: screens.AudioStack,
    focusedRoute: screens.AudioStack,
    title: 'הקלטה',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
   {
    name: screens.Audio,
    focusedRoute: screens.AudioStack,
    title: 'הקלטה',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },

  {
    name: screens.ACTION4,
    focusedRoute: screens.AudioStack,
    title: 'הקלטה',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  },
  // {
  //   name: screens.AudioGroupMembers,
  //   focusedRoute: screens.AudioStack,
  //   title: 'הקלטה',
  //   showInTab: false,
  //   showInDrawer: false,
  //   icon: (focused) =>
  //     <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  // },
  // {
  //   name: screens.Audiodetails,
  //   focusedRoute: screens.AudioStack,
  //   title: 'הקלטה',
  //   showInTab: false,
  //   showInDrawer: false,
  //   icon: (focused) =>
  //     <Icon name="file-sound-o" size={30} color={focused ? '#AAAAEE' : '#000'} />,
  // },

]

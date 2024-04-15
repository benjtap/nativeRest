import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  Test1: 'test1',
  Test2: 'test2',
  Test3: 'test3',
  GroupMembers: 'GroupMembers',
  BookStack: 'BookStack',
  Book: 'Book',
  ContactStack: 'ContactStack',
  Contact: 'Contact',
  MyRewardsStack: 'MyRewardsStack',
  MyRewards: 'MyRewards',
  LocationsStack: 'LocationsStack',
  Locations: 'Locations',
}

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Test1,
    focusedRoute: screens.HomeStack,
    title: 'test1',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Test2,
    focusedRoute: screens.HomeStack,
    title: 'test2',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Test3,
    focusedRoute: screens.HomeStack,
    title: 'test3',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.GroupMembers,
    focusedRoute: screens.HomeStack,
    title: 'GroupMembers',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  
  {
    name: screens.BookStack,
    focusedRoute: screens.BookStack,
    title: 'Book Room',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="bed" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.Book,
    focusedRoute: screens.BookStack,
    title: 'Book Room',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="bed" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.ContactStack,
    focusedRoute: screens.ContactStack,
    title: 'Contact Us',
    showInTab: true,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="phone" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.Contact,
    focusedRoute: screens.ContactStack,
    title: 'Contact Us',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="phone" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.MyRewardsStack,
    focusedRoute: screens.MyRewardsStack,
    title: 'My Rewards',
    showInTab: false,
    showInDrawer: true,
    icon: (focused) =>
      <Icon name="star" size={30} color={focused ? '#551E18' : '#000'} />,
  },
  {
    name: screens.MyRewards,
    focusedRoute: screens.MyRewardsStack,
    title: 'My Rewards',
    showInTab: false,
    showInDrawer: false,
    icon: (focused) =>
      <Icon name="star" size={30} color={focused ? '#551E18' : '#000'} />,
  },

  {
    name: screens.LocationsStack,
    focusedRoute: screens.LocationsStack,
    title: 'Locations',
    showInTab: false,
    showInDrawer: true,
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

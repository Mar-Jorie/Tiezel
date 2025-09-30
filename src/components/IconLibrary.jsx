import React from 'react';
import {
  ShoppingBagIcon,
  PhoneIcon,
  TruckIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  MapPinIcon,
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CameraIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  GiftIcon,
  HandThumbUpIcon,
  LightBulbIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  TagIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
  Bars3Icon,
  ArrowRightIcon,
  CheckIcon,
  CursorArrowRaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Centralized icon library
const iconLibrary = {
  ShoppingBagIcon,
  PhoneIcon,
  TruckIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  MapPinIcon,
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CameraIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  GiftIcon,
  HandThumbUpIcon,
  LightBulbIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  TagIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
  Bars3Icon,
  ArrowRightIcon,
  CheckIcon,
  CursorArrowRaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon
};

// Function to get icon component by name
export const getIcon = (iconName, fallback = 'ShieldCheckIcon') => {
  return iconLibrary[iconName] || iconLibrary[fallback];
};

// Function to render icon with props
export const renderIcon = (iconName, props = {}, fallback = 'ShieldCheckIcon') => {
  const IconComponent = getIcon(iconName, fallback);
  return React.createElement(IconComponent, props);
};

// List of available icons for selection (used in ContentManagement)
export const availableIcons = [
  { name: 'ShoppingBagIcon', label: 'Shopping Bag', component: ShoppingBagIcon },
  { name: 'PhoneIcon', label: 'Phone', component: PhoneIcon },
  { name: 'TruckIcon', label: 'Truck', component: TruckIcon },
  { name: 'StarIcon', label: 'Star', component: StarIcon },
  { name: 'HeartIcon', label: 'Heart', component: HeartIcon },
  { name: 'ShieldCheckIcon', label: 'Shield Check', component: ShieldCheckIcon },
  { name: 'ClockIcon', label: 'Clock', component: ClockIcon },
  { name: 'UserGroupIcon', label: 'User Group', component: UserGroupIcon },
  { name: 'ChartBarIcon', label: 'Chart Bar', component: ChartBarIcon },
  { name: 'GlobeAltIcon', label: 'Globe', component: GlobeAltIcon },
  { name: 'EnvelopeIcon', label: 'Envelope', component: EnvelopeIcon },
  { name: 'MapPinIcon', label: 'Map Pin', component: MapPinIcon },
  { name: 'AcademicCapIcon', label: 'Academic Cap', component: AcademicCapIcon },
  { name: 'BeakerIcon', label: 'Beaker', component: BeakerIcon },
  { name: 'BoltIcon', label: 'Bolt', component: BoltIcon },
  { name: 'BookOpenIcon', label: 'Book Open', component: BookOpenIcon },
  { name: 'BriefcaseIcon', label: 'Briefcase', component: BriefcaseIcon },
  { name: 'CameraIcon', label: 'Camera', component: CameraIcon },
  { name: 'ComputerDesktopIcon', label: 'Computer Desktop', component: ComputerDesktopIcon },
  { name: 'DevicePhoneMobileIcon', label: 'Mobile Phone', component: DevicePhoneMobileIcon },
  { name: 'FireIcon', label: 'Fire', component: FireIcon },
  { name: 'GiftIcon', label: 'Gift', component: GiftIcon },
  { name: 'HandThumbUpIcon', label: 'Thumbs Up', component: HandThumbUpIcon },
  { name: 'LightBulbIcon', label: 'Light Bulb', component: LightBulbIcon },
  { name: 'MusicalNoteIcon', label: 'Musical Note', component: MusicalNoteIcon },
  { name: 'PaintBrushIcon', label: 'Paint Brush', component: PaintBrushIcon },
  { name: 'PuzzlePieceIcon', label: 'Puzzle Piece', component: PuzzlePieceIcon },
  { name: 'RocketLaunchIcon', label: 'Rocket Launch', component: RocketLaunchIcon },
  { name: 'SparklesIcon', label: 'Sparkles', component: SparklesIcon },
  { name: 'SunIcon', label: 'Sun', component: SunIcon },
  { name: 'TagIcon', label: 'Tag', component: TagIcon },
  { name: 'TrophyIcon', label: 'Trophy', component: TrophyIcon },
  { name: 'WrenchScrewdriverIcon', label: 'Wrench Screwdriver', component: WrenchScrewdriverIcon }
];

export default iconLibrary;

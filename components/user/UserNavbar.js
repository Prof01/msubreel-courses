// UserNavbar.js
'use client'
import { useState } from 'react';
import { Box, Flex, IconButton, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggler } from '../ThemeToggler';

const UserNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <Flex as="nav" align="center" justify="space-between" p="4" bg="blue.500" color="white">
      <Link href="/">
          <Image alt='Logo' src={'/icons/icon-96x96.png'} width={60} height={60}/>
      </Link>

      <Spacer />

      {/* Mobile Menu Toggler */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label="Toggle menu"
        icon={<span className='text-sm'>Menu</span>}
        size="lg"
        onClick={toggleMobileMenu} // Add onClick to toggle mobile menu
      />
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <VStack
          display={{ base: 'flex', md: 'none' }}
          spacing="4"
          align="stretch"
          bg="blue.500"
          position="absolute"
          top="16"
          left="0"
          right="0"
          p="2"
          zIndex="1000"
        >
          <MenuItem href="/app/dashboard">Dashboard</MenuItem>
          <MenuItem href="/app/lessons">Lessons</MenuItem>
          <MenuItem href="/app/courses">Courses</MenuItem>
          <MenuItem href="/app/billing">Billing</MenuItem>
          <MenuItem href="/app/support">Support</MenuItem>
          <MenuItem href="/app/settings">Settings</MenuItem>
          <span className='text-right'>Theme: <ThemeToggler /></span>
        </VStack>
      )}

      {/* Desktop Menu */}
      <HStack
        display={{ base: 'none', md: 'flex' }}
        spacing="4"
        align="center"
        bg="blue.500"
        // position="absolute"
        // top="16"
        // left="0"
        // right="0"
        p="2"
        zIndex="1000"
      >
        <MenuItem href="/app/dashboard">Dashboard</MenuItem>
        <MenuItem href="/app/lessons">Lessons</MenuItem>
        <MenuItem href="/app/courses">Courses</MenuItem>
        <MenuItem href="/app/billing">Billing</MenuItem>
        <MenuItem href="/app/support">Support</MenuItem>
        <MenuItem href="/app/settings">Settings</MenuItem>
        <div className='text-right font-semibold pb-1 text-xs'><ThemeToggler /></div>
      </HStack>
    </Flex>
  );
};

const MenuItem = ({ href, children }) => {
  return (
    <Link href={href}>
        <Text fontSize="md" fontWeight="medium" color="white" _hover={{ textDecoration: 'underline' }}>
          {children}
        </Text>
    </Link>
  );
};

export default UserNavbar;

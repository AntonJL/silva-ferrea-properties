import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import {
  FiMenu,
  FiHome,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiTool,
  FiFileText,
  FiLogOut,
  FiUser,
} from 'react-icons/fi'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

interface NavItem {
  name: string
  icon: React.ComponentType
  path: string
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { name: 'Properties', icon: FiMapPin, path: '/properties' },
  { name: 'Tenants', icon: FiUsers, path: '/tenants' },
  { name: 'Transactions', icon: FiDollarSign, path: '/transactions' },
  { name: 'Maintenance', icon: FiTool, path: '/maintenance' },
  { name: 'Documents', icon: FiFileText, path: '/documents' },
]

interface SidebarContentProps {
  onClose: () => void
}

const SidebarContent = ({ onClose }: SidebarContentProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <VStack h="full" spacing={0}>
      <Box p={4} w="full">
        <Text fontSize="xl" fontWeight="bold" color="brand.600">
          Silva Ferrea
        </Text>
      </Box>
      <VStack flex={1} w="full" spacing={1} p={4}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Button
              key={item.name}
              w="full"
              justifyContent="flex-start"
              leftIcon={<Icon />}
              variant={isActive ? 'solid' : 'ghost'}
              colorScheme={isActive ? 'brand' : 'gray'}
              onClick={() => {
                navigate(item.path)
                onClose()
              }}
            >
              {item.name}
            </Button>
          )
        })}
      </VStack>
      <Box p={4} w="full">
        <Button
          w="full"
          leftIcon={<FiLogOut />}
          variant="ghost"
          colorScheme="red"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </VStack>
  )
}

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useAuthStore()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" bg="gray.50">
      <Box
        ml={{ base: 0, md: 60 }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="1rem"
          bg={bg}
          borderBottom="1px"
          borderColor={borderColor}
          h="16"
        >
          <IconButton
            aria-label="Open menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Text fontSize="lg" fontWeight="semibold">
            Property Management
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar size="sm" name={`${user?.firstName} ${user?.lastName}`} />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>
                {user?.firstName} {user?.lastName}
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} onClick={() => useAuthStore.getState().logout()}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box p="1rem">
          {children}
        </Box>
      </Box>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Silva Ferrea Properties
          </DrawerHeader>
          <DrawerBody p={0}>
            <SidebarContent onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        left={0}
        top={0}
        h="full"
        w="60"
        bg={bg}
        borderRight="1px"
        borderColor={borderColor}
      >
        <SidebarContent onClose={() => {}} />
      </Box>
    </Box>
  )
}

export default Layout 
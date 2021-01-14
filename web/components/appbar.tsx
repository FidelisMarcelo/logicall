import React from "react";
import Link from "next/link";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdMenu } from "react-icons/md";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

function AppBar({ user, signOut }) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="blue.500"
      color="white"
      pos="fixed"
      w="100%"
      zIndex="1000"
    >
      <Flex align="center" direction="column" mr={5}>
        <Heading as="h1" size="lg">
          LogiCall
        </Heading>
        <Heading as="h5" size="xs">
          admin
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <Icon as={MdMenu} />
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <Link href="/">
            <Button variant="link" color="white">
              Orders
            </Button>
          </Link>
        </MenuItems>
        <MenuItems>
          <Link href="/drivers">
            <Button variant="link" color="white">
              Drivers
            </Button>
          </Link>
        </MenuItems>
      </Box>

      <Box display={{ sm: show ? "block" : "none", md: "flex" }}>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            rightIcon={<ChevronDownIcon />}
          >
            {user?.me?.username}
          </MenuButton>
          <MenuList>
            <MenuItem
              color="red.500"
              onClick={signOut}
            >
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default AppBar;

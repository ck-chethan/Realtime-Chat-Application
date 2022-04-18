import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import './sideDrawer.css'
import { ChatState } from '../../../context/ChatProvider'
import ProfileModal from '../profileModal/ProfileModal'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()

  const { user } = ChatState()

  return (
    <>
      <Box
        d={'flex'}
        justifyContent="space-between"
        alignItems={'center'}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={'5px'}
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant={'ghost'}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: 'none', md: 'flex' }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize={'2xl'} fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <Menu>
          <MenuButton p={1}>
            <BellIcon fontSize={'2xl'} m={1}></BellIcon>
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              size={'sm'}
              cursor="pointer"
              name={user.name}
              src={user.pic}
            ></Avatar>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  )
}

export default SideDrawer

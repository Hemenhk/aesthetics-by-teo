"use client";

import React, { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import CartDrawer from "./cart-drawer/CartDrawer";
import CartTotal from "./cart-drawer/CartTotal";
import { useShopifyContext } from "@/app/context/store";

export default function CartIcon() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const { isCartOpen } = useShopifyContext();

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        w={"75px"}
        borderRadius={"30px"}
        cursor={"pointer"}
        bgSize={"200% 100%"}
        bgPosition={"right bottom"}
        color={"#000"}
        transition={"all 0.5s ease-out"}
        _hover={{
          backgroundPosition: "left bottom",
        }}
      >
        <Flex alignItems={"center"} gap={2}>
          <HiOutlineShoppingBag size={25} />
        </Flex>
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen || isCartOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"#fafafa"}>
          <DrawerCloseButton size={"lg"} />
          <DrawerHeader
            fontFamily={"noto sans"}
            fontWeight={"400"}
            letterSpacing={2}
            borderBottomWidth="1px"
            mb={8}
          >
            CART
          </DrawerHeader>
          <DrawerBody>
            <CartDrawer />
          </DrawerBody>
          <DrawerFooter justifyContent={"center"}>
            <DrawerBody>
              <CartTotal />
            </DrawerBody>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

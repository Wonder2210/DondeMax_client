import React from "react";
import {
  useDisclosure,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
} from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Config from "@iconify/icons-cil/cog";
import { IconButton, ShoppingCart, Button as CustomButton } from "../../atoms/Buttons";
import { SelectCustom, SelectOption } from "../../molecules/Select";
import { props } from "./types";

const MobileScreen = ({ preservations, types }: props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const PreservationsOptions = preservations.list.map((i, n) => {
    return (
      <SelectOption key={i.id} value={i.type}>
        {i.type}
      </SelectOption>
    );
  });
  const TypesOptions = types.list.map((i) => {
    return (
      <SelectOption key={i.id} value={i.type}>
        {i.type}
      </SelectOption>
    );
  });
  return (
    <>
      <Flex
        zIndex={1}
        position="absolute"
        justify="space-between"
        alignItems="center"
        top="0"
        right="0"
        backgroundColor="#2F4858"
        h="3em"
        w="100%"
      >
        <Flex w="20%" marginLeft="0.3em" h="100%" alignItems="center">
          <IconButton
            aria-label="filter-settings"
            backgroundColor="colors.rose.600"
            borders={["25px", "25px"]}
            onClick={onOpen}
            icon={<Icon icon={Config} width="80%" height="80%" color="#fff" />}
          />
        </Flex>
        <Flex w="20%" h="100%" alignItems="center">
          <ShoppingCart itemsCount={0} color="#fff" backgroundColor="rgba(1,1,1,0)" />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay w="100vw" height="100vh" />
        <ModalContent>
          <ModalHeader>Filtrar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="space-between" height="100%" align="center" left="0" direction="column">
              <Flex>
                <SelectCustom
                  value={preservations.value}
                  onChange={preservations.onChange}
                  toggle={preservations.toggle}
                  placeholder="Preservacion"
                  show={preservations.show}
                >
                  <SelectOption value="">Todos</SelectOption>
                  {PreservationsOptions}
                </SelectCustom>
              </Flex>
              <Flex marginTop="5vh">
                <SelectCustom
                  value={types.value}
                  onChange={types.onChange}
                  toggle={types.toggle}
                  placeholder="Tipo"
                  show={types.show}
                >
                  <SelectOption value="">Todos</SelectOption>
                  {TypesOptions}
                </SelectCustom>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#E91E63"
              color="#FFF"
              mr={3}
              _hover={{ transform: "scale(1.1)" }}
              onClick={onClose}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MobileScreen;

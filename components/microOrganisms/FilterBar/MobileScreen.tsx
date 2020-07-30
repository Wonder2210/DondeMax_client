import React, { FormEvent } from "react";
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
import { IconButton, ShoppingCart } from "../../atoms/Buttons";
import { SelectCustom, SelectOption } from "../../molecules/Select";

type props = {
  show1: boolean;
  value1: string;
  toggle1: () => void;
  onChange1: (event: FormEvent<any>) => void & ((value: string & number) => void);
  show2: boolean;
  value2: string;
  toggle2: () => void;
  onChange2: (event: FormEvent<any>) => void & ((value: string & number) => void);
};

const MobileScreen = ({ show1, show2, value1, value2, toggle1, onChange1, onChange2, toggle2 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            backgroundColor="rose.600"
            borders={["25px", "25px"]}
            onClick={onOpen}
            icon={() => <Icon icon={Config} width="80%" height="80%" color="#fff" />}
          />
        </Flex>
        <Flex w="20%" h="100%" alignItems="center">
          <ShoppingCart itemsCount={0} color="#fff" />
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtrar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="space-between" height="100%" align="center" left="0" direction="column">
              <Flex>
                <SelectCustom
                  value={value1}
                  onChange={onChange1}
                  toggle={toggle1}
                  placeholder="put here what you want"
                  show={show1}
                >
                  <SelectOption value="here">Here</SelectOption>
                  <SelectOption value="option">There</SelectOption>
                  <SelectOption value="last">everywhere</SelectOption>
                </SelectCustom>
              </Flex>
              <Flex marginTop="5vh">
                <SelectCustom
                  value={value2}
                  onChange={onChange2}
                  toggle={toggle2}
                  placeholder="put here what you want"
                  show={show2}
                >
                  <SelectOption value="here">Here</SelectOption>
                  <SelectOption value="option">There</SelectOption>
                  <SelectOption value="last">everywhere</SelectOption>
                </SelectCustom>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="rose.600"
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

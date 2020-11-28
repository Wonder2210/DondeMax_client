import React from "react";
import {
  Menu,
  MenuButton,
  Image,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/core";
import { useAppContext } from "../../../utils/AppContext";
import { Icon } from "@iconify/react";
import exit from "@iconify/icons-cil/exit-to-app";
import locked from "@iconify/icons-cil/lock-locked";
import home from "@iconify/icons-cil/home";
import list from "@iconify/icons-cil/list";
import unlocked from "@iconify/icons-cil/lock-unlocked";
import downChevron from "@iconify/icons-dashicons/arrow-down-alt2";
import { Button as CustomButton } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";
import { useAuth } from "../../../utils/AuthHook";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type props = {
  image?: string;
  imageAlt?: string;
  userName?: string;
};

const UserDropdown: React.FC<props> = ({ image, imageAlt, userName }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, setState } = useAppContext();
  const { user } = useAuth();
  const [password, setPassword] = React.useState({
    value: "",
    error: false,
  });
  const onChange = (e) => {
    setPassword({ ...password, error: false, value: e.target.value });
  };
  const onUnlock = () => {
    console.log(password.value);
    if (Number(password.value) === Number(state.adminPassword)) {
      setState({ ...state, admin: true });
      closeModal();
    }
    setPassword({ ...password, error: true });
  };
  const closeModal = () => {
    onClose();
    setPassword({ error: false, value: "" });
  };
  const dropAdminMode = () => {
    setState({ ...state, admin: false });
  };
  const CloseSession = () => {
    Cookies.remove("auth");
    router.push("/");
  };
  return (
    <>
      <style jsx>{`
        .margin-span {
          margin-left: 1.5em;
        }
      `}</style>

      {user ? (
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
                alt={imageAlt}
                bgColor="#223"
              />
            }
            rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
            bgColor="transparent"
          >
            {user.name}
          </MenuButton>
          <MenuList>
            {user.role == "ADMINISTRADOR" && (
              <MenuItem minH="48px" onClick={state.admin ? dropAdminMode : onOpen}>
                <Icon icon={Boolean(state.admin) ? unlocked : locked} width="2em" />
                <span className="margin-span">Admin</span>
              </MenuItem>
            )}
            {user.role == "CLIENT" && (
             <>
              <MenuItem minH="48px" onClick={()=> router.push("/")}>
                <Icon icon={home} width="2em" />
                <span className="margin-span">Inicio</span>
              </MenuItem>
              <MenuItem minH="48px" onClick={()=> router.push("/client")}>
                <Icon icon={list} width="2em" />
                <span className="margin-span">Pedidos</span>
              </MenuItem>
             </>
            )}
            <MenuItem minH="40px" onClick={CloseSession}>
              <Icon icon={exit} width="2em" />
              <span className="margin-span">Salir</span>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <CustomButton
          color="black"
          onClick={() => router.push("/login")}
          width="5em"
          height="2.5em"
          backgroundColor="transparent"
        >
          Ingresar
        </CustomButton>
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clave de Administrador </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormInput
              errorMessage="Clave erronea"
              placeHolder="Clave de admin"
              id="key"
              label="Clave:"
              type="password"
              variant="flushed"
              field={{
                onChange: onChange,
                value: password.value,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <CustomButton width="100%" height="2.5em" onClick={onUnlock} backgroundColor="colors.rose.600">
              Ingresar
            </CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserDropdown;

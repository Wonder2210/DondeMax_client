/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
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
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import G from "@iconify/icons-dashicons/google";
import exit from "@iconify/icons-cil/exit-to-app";
import locked from "@iconify/icons-cil/lock-locked";
import UserIcon from "@iconify/icons-dashicons/admin-users";
import home from "@iconify/icons-cil/home";
import list from "@iconify/icons-cil/list";
import { useGoogleLogin, useGoogleLogout } from "react-google-login";
import unlocked from "@iconify/icons-cil/lock-unlocked";
import downChevron from "@iconify/icons-dashicons/arrow-down-alt2";
import { useRouter } from "next/router";
import { useAppContext } from "../../../utils/AppContext";
import { Button as CustomButton, IconButton } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";
import { useAuth } from "../../../utils/AuthHook";

type props = {
  image?: string;
  imageAlt?: string;
  userName?: string;
};

const UserDropdown: React.FC<props> = ({ image, imageAlt, userName }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, setState, setAuthToken } = useAppContext();
  const { employee, customer, closeSession } = useAuth();
  const [password, setPassword] = React.useState({
    value: "",
    error: false,
  });

  const clientId = "1080660100211-q183khnmnj2rlnbtpvjn9e1o2fo2590v.apps.googleusercontent.com";
  const onChange = (e) => {
    setPassword({ ...password, error: false, value: e.target.value });
  };
  const closeModal = () => {
    onClose();
    setPassword({ error: false, value: "" });
  };
  const onUnlock = () => {
    if (Number(password.value) === Number(state.adminPassword)) {
      setState({ ...state, admin: true });
      closeModal();
    }
    setPassword({ ...password, error: true });
  };
  const responseGoogle = (response) => {
    console.log(response);
  };

  const dropAdminMode = () => {
    setState({ ...state, admin: false });
  };
  const CloseSession = () => {
    closeSession();
    setAuthToken("");
    router.push("/");
  };
  const onSuccess = (data) => {
    setAuthToken(data.tokenId);
  };
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: CloseSession,
    onFailure: () => alert("try later"),
  });
  const { signIn } = useGoogleLogin({
    clientId,
    cookiePolicy: "single_host_origin",
    isSignedIn: true,
    onFailure: responseGoogle,
    onSuccess,
  });
  return (
    <>
      {customer.id || employee.id ? (
        customer ? (
          <Menu>
            <MenuButton
              as={Button}
              isTruncated
              leftIcon={<Image borderRadius="50%" width="2em" src={customer.image} bgColor="#223" />}
              rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
              bgColor="transparent"
            >
              {customer.name}
            </MenuButton>
            <MenuList>
              <MenuItem minH="3em" onClick={() => router.push("/")} icon={<Icon icon={home} width="2em" />}>
                <span className="margin-span">Inicio</span>
              </MenuItem>
              <MenuItem minH="3em" onClick={() => router.push("/client")} icon={<Icon icon={list} width="2em" />}>
                <span className="margin-span">Pedidos</span>
              </MenuItem>
              <MenuItem minH="3em" onClick={signOut} icon={<Icon icon={exit} width="2em" />}>
                <span className="margin-span">Salir</span>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              isTruncated
              leftIcon={
                <Image
                  boxSize="1rem"
                  borderRadius="full"
                  src={`https://ui-avatars.com/api/?background=random&name=${employee.name}`}
                  alt={imageAlt}
                  bgColor="#223"
                />
              }
              rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
              bgColor="transparent"
            >
              {employee.name}
            </MenuButton>
            <MenuList>
              <MenuItem minH="3em" onClick={state.admin ? dropAdminMode : onOpen}>
                <Icon icon={state.admin ? unlocked : locked} width="2em" />
                <span className="margin-span">Admin</span>
              </MenuItem>

              <MenuItem minH="3em" onClick={() => router.push("/")}>
                <Icon icon={home} width="2em" />
                <span className="margin-span">Inicio</span>
              </MenuItem>
              <MenuItem minH="3em" onClick={() => router.push("/client")}>
                <Icon icon={list} width="2em" />
                <span className="margin-span">Pedidos</span>
              </MenuItem>
              <MenuItem minH="3em" onClick={CloseSession}>
                <Icon icon={exit} width="2em" />
                <span className="margin-span">Salir</span>
              </MenuItem>
            </MenuList>
          </Menu>
        )
      ) : (
        <IconButton
          aria-label="user"
          color="black"
          width="5em"
          height="2.5em"
          backgroundColor="transparent"
          onClick={signIn}
          icon={<Icon icon={UserIcon} width="36px" />}
        />
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
                onChange,
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

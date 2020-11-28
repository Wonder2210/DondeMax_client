import * as React from "react";
import { Flex, Divider } from "@chakra-ui/core";
import { useQuery, gql } from "@apollo/client";
import { Parragraph } from "../../atoms/Text";
import { UserDropdown } from "../../molecules/Dropdown";
import { useRouter } from "next/router";

const user = gql`
  query SessionUser {
    sessionUser
  }
`;

const NavbarClient: React.FC = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery(user);
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }
  let hour = date.getHours();
  let minutes = date.getMinutes();
  return (
    <Flex
      width="100%"
      height="4em"
      paddingX="1em"
      alignItems="center"
      position="sticky"
      top={0}
      backgroundColor="white"
    >
      <Parragraph width="13em" height="min-content">
        {loading ? "Cargando ..." : JSON.parse(data.sessionUser).name}
      </Parragraph>
      <a href="/" onClick={() => router.push("/")}>
        Inicio
      </a>
      <span></span>
      <span></span>
      <a href="#" style={{ marginLeft: "1em" }} onClick={() => router.push("/store")}>
        Pedidos
      </a>
      <Flex flexGrow={1} align="center" justify="flex-end" justifySelf="flex-end" bgColor="#FFF">
        <Parragraph width="13em" height="min-content">
          {hour < 12 ? hour : hour - 12}&#58;{minutes < 10 ? `0${minutes}` : minutes} {hour >= 12 ? "PM" : "AM"}
        </Parragraph>
        <Divider borderColor="#222" orientation="vertical" height="3em" />
        <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="User" userName="User" />
      </Flex>
    </Flex>
  );
};

export default NavbarClient;

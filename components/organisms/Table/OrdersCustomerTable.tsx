import React from "react";
import {
  Badge,
  Stat,
  StatNumber,
  StatLabel,
  Flex,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import infoOutline from "@iconify/icons-dashicons/info-outline";
import Table from "./SortedTable";

const Product: React.FC<{ image: string; quantity: number; name: string; price: number }> = ({
  image,
  quantity,
  name,
  price,
}) => {
  return (
    <Flex justifyContent="space-between">
      <Image src={image} w="2em" h="2em" borderRadius="50%" />
      <h4>{name}</h4>
      <p>
        {quantity}x{price}
      </p>
      <h5>{quantity * price}</h5>
    </Flex>
  );
};

type props = {
  data: Array<any>;
  id: string;
  cancelOrder?: (id: string) => void;
};

const OrdersCustomerTable: React.FC<props> = ({ data, id, cancelOrder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const defaultState = {
    id: "",
    total: 0,
    products: [],
  };

  const [state, setState] = React.useState<{
    id?: string;
    abono?: number;
    total?: number;
    productionStatus?: boolean;
    products?: Array<{
      id: string;
      image: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  }>({ ...defaultState });
  const onMoreInfo = (row: any) => {
    const {
      // eslint-disable-next-line no-shadow
      original: { products, total, id, abono, production_status },
    } = row;
    setState({
      id,
      total,
      abono,
      productionStatus: production_status,
      products: products.map((i) => ({
        id: i.product.id,
        image: i.product.image,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.precio,
      })),
    });
    onOpen();
  };

  const onCancelOrder = () => {
    cancelOrder(state.id);
    onClose();
  };
  const columns = React.useMemo(
    (): Array<{ Header: string; accessor?: string; Cell?: any }> => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "fecha de entrega",
        accessor: "deliveryDate",
        Cell: ({ value }) => {
          const dateString = value;
          const date = new Date(dateString.replace(" ", "T"));

          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          return String(`${day}-${month}-${year}`);
        },
      },
      {
        Header: "hora de entrega",
        accessor: "deliveryTime",
      },
      {
        Header: "Metodo de pago",
        accessor: "payMethod",
      },
      {
        Header: "Nota",
        accessor: "note",
      },
      {
        Header: "Estatus",

        Cell: ({ row }) => {
          if (row.production_status && row.stage_status && !row.delivery_status) {
            return <Badge colorScheme="orange">Listo para ser entregado</Badge>;
          }
          if (row.delivery_status) {
            return <Badge colorScheme="green">Entregado</Badge>;
          }
          if (row.production_status && row.stage_status && !row.delivery_status) {
            return <Badge colorScheme="purple">pedido en produccion</Badge>;
          }
          if (!row.production_status && !row.stage_status && !row.delivery_status) {
            return <Badge>Pedido recibido</Badge>;
          }
          return "";
        },
      },
      {
        Header: "info",
        Cell: ({ row }) => {
          return (
            <IconButton
              aria-label="info"
              background="transparent"
              onClick={() => onMoreInfo(row)}
              icon={<Icon icon={infoOutline} />}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pedido #{state.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="space-between">
              {state.products.map((i) => (
                <Product key={i.id} image={i.image} price={i.price} name={i.name} quantity={i.quantity} />
              ))}
            </VStack>
            <Flex align="center" justify="apace-between" marginY="1em">
              <Stat textAlign="left">
                <StatLabel>Abono</StatLabel>
                <StatNumber>{state.abono}$</StatNumber>
              </Stat>
              <Stat textAlign="center">
                <StatLabel>Restante</StatLabel>
                <StatNumber>{state.total - state.abono}$</StatNumber>
              </Stat>
              <Stat textAlign="right">
                <StatLabel>Total</StatLabel>
                <StatNumber>{state.total}$</StatNumber>
              </Stat>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button bgColor="colors.rose.600" color="white" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" variant="outline" isDisabled={state.productionStatus} onClick={onCancelOrder}>
              Cancel order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Table data={data} id={id} columns={columns} />
    </>
  );
};

export default OrdersCustomerTable;

import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Stat,
  StatNumber,
  StatLabel,
  Flex,
} from "@chakra-ui/core";
import Plus from "@iconify/icons-cil/plus";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import { IconButton } from "../../atoms/Buttons";
import { SelectInput, DateInput } from "../../atoms/Inputs";
import { Table } from "../Table";

type props = {
  values: {};
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  total: number;
  productsList: Array<{ id: number; name: string; price: number; quantity: number; total: number }>;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  deliveryDate: Yup.string().required(VALIDATION_MESSAGE),

  payMethod: Yup.string().required(VALIDATION_MESSAGE),
  note: Yup.string(),
});

const Pedido: React.FC<props> = ({ isOpen, onClose, values, onSubmit, total, productsList }) => {
  const payMethod = ["EFECTIVO", "DEBITO", "TRANSFERENCIA", " DOLARES", "PESOS"].map((i) => ({
    id: i,
    type: i,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agrega nuevo Pedido</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{}}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }}
        >
          <Form>
            <ModalBody>
              <Field name="deliveryDate">
                {({ field, form }) => (
                  <DateInput
                    id="deliveryDate"
                    label="Fecha de Entrega"
                    errorMessage={form.errors.deliveryDate}
                    isInvalid={form.errors.deliveryDate && form.touched.deliveryDate}
                    form={form}
                    field={field}
                  />
                )}
              </Field>

              <Field name="payMethod">
                {({ field, form }) => (
                  <SelectInput
                    placeholder="Metodo de pago"
                    options={payMethod}
                    id="mthod"
                    field={field}
                    isInvalid={form.errors.payMethod && form.touched.payMethod}
                    label="Metodo de pago:"
                    variant="flushed"
                    errorMessage={form.errors.payMethod}
                  />
                )}
              </Field>
              <Field name="note">{({ field, form }) => <Textarea variant="flushed" size="sm" {...field} />}</Field>
              {productsList && (
                <Table
                  data={productsList}
                  columns={[
                    {
                      Header: "Nombre",
                      accessor: "name",
                    },
                    {
                      Header: "Precio",
                      accessor: "precio",
                    },
                    {
                      Header: "Cantidad",
                      accessor: "quantity",
                    },
                    {
                      Header: "total",
                      accessor: "total", // el total debe de ser calculado al momento de a;adirlo en state
                    },
                  ]}
                />
              )}
            </ModalBody>

            <ModalFooter>
              <Flex justify="space-between" alignItems="flex-end" width="100%">
                <Flex maxWidth="80%" justify="space-between" alignItems="flex-end">
                  <Stat>
                    <StatLabel> Total:</StatLabel>
                    <StatNumber>{total}$</StatNumber>
                  </Stat>
                </Flex>
                <IconButton
                  type="submit"
                  aria-label="add-more"
                  backgroundColor="colors.rose.600"
                  icon={<Icon icon={Plus} color="white" />}
                />
              </Flex>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default Pedido;

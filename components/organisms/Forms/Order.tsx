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
import { IconButton } from "../../atoms/Buttons";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import x from "@iconify/icons-cil/x";
import { DynamicProductType, SelectInput, DateInput, NumberInput } from "../../atoms/Inputs";
import { Table } from "../Table";

type props = {
  values: {};
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  onEdit: (data: Object) => void;
  isEditing: Boolean;
  clientList: Array<{ id: number; type: string }>;
  productList: Array<{ id: number; type: string; price: number }>;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  deliveryDate: Yup.string().required(VALIDATION_MESSAGE),
  client: Yup.number().required(VALIDATION_MESSAGE),
  payMethod: Yup.string().required(VALIDATION_MESSAGE),
  note: Yup.string(),
  products: Yup.array()
    .min(1)
    .of(
      Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        price: Yup.number(),
        quantity: Yup.number(),
        total: Yup.number(),
      }),
    ),
});

const Pedido: React.FC<props> = ({ isOpen, onClose, values, onSubmit, isEditing, onEdit, clientList, productList }) => {
  const defaultState = {
    data: [...productList],
    list: [],
    total: 0,
    abono: 0,
    monto: 0,
  };
  const [state, setState] = React.useState(defaultState);
  React.useEffect(() => {
    if (state.list.length > 0) {
      let total = state.list.reduce((prev, current) => prev + current.total, 0);
      let monto = total - state.abono;
      setState({ ...state, total, monto });
    } else {
      setState({ ...state, total: 0, monto: 0, abono: 0 });
    }
  }, [state.list, state.abono]);

  const pay_method = ["EFECTIVO", "DEBITO", "TRANSFERENCIA", " DOLARES", "PESOS"].map((i) => ({
    id: i,
    type: i,
  }));
  const AddToList = (set, value, last) => {
    setState((lastState) => ({
      ...lastState,
      data: lastState.data.filter((i) => i.id !== Number(value.id)),
      list: [...lastState.list, value],
    }));
    set("products", [...last, value]);
  };
  const resetState = () => setState({ ...defaultState });
  const close = () => {
    resetState();
    onClose();
  };
  const RemoveFromList = (set, { id, name, price }, last) => {
    setState((lastState) => ({
      ...lastState,
      data: lastState.data.concat({ id: id, type: name, price: price }),
      list: lastState.list.filter((i) => i.id !== id),
    }));
    set(
      "products",
      last.filter((i) => Number(i.id) !== Number(id)),
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? `Editando pedido` : "Agrega nuevo Pedido"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            products: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            if (isEditing) {
              return onEdit(data);
            }
            onSubmit({
              ...data,
              total: state.total,
              abono: state.abono,
              monto: state.monto,
            });
            close();
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
              <Field name="client">
                {({ field, form }) => (
                  <SelectInput
                    placeholder="Cliente"
                    options={clientList}
                    id="client"
                    field={field}
                    isInvalid={form.errors.client && form.touched.client}
                    label="Cliente:"
                    variant="flushed"
                    errorMessage={form.errors.client}
                  />
                )}
              </Field>
              <Field name="payMethod">
                {({ field, form }) => (
                  <SelectInput
                    placeholder="Metodo de pago"
                    options={pay_method}
                    id="mthod"
                    field={field}
                    isInvalid={form.errors.payMethod && form.touched.payMethod}
                    label="Metodo de pago:"
                    variant="flushed"
                    errorMessage={form.errors.payMethod}
                  />
                )}
              </Field>
              <Field name="note">
                {({ field, form }) => (
                  <>
                    <label htmlFor="text">Nota</label>
                    <Textarea id="text" variant="flushed" size="sm" {...field} />
                  </>
                )}
              </Field>
              <Field name="products">
                {({ field, form }) => (
                  <>
                    <DynamicProductType
                      options={state.data}
                      placeholder="Productos:"
                      variant="flushed"
                      add={(e) => AddToList(form.setFieldValue, e, field.value)}
                    />
                    {field.value.length >= 1 && (
                      <Table
                        data={field.value}
                        columns={[
                          {
                            Header: "Nombre",
                            accessor: "name",
                          },
                          {
                            Header: "Precio",
                            accessor: "price",
                          },
                          {
                            Header: "Cantidad",
                            accessor: "quantity",
                          },
                          {
                            Header: "total",
                            accessor: "total", // el total debe de ser calculado al momento de a;adirlo en state
                          },
                          {
                            Header: "Acciones",
                            Cell: ({ row }) => {
                              return (
                                <IconButton
                                  aria-label="delete"
                                  icon={<Icon icon={x} color="rgb(205,4,4)" />}
                                  onClick={() => RemoveFromList(form.setFieldValue, row.original, field.value)}
                                />
                              );
                            },
                          },
                        ]}
                      />
                    )}
                  </>
                )}
              </Field>
              <Field name="abono">
                {({ form, field }) => (
                  <NumberInput
                    label="abono"
                    variant="flushed"
                    id="abono"
                    defaultValue={0}
                    max={state.total}
                    errorMessage={form.errors.abono}
                    onChange={(val) => {
                      form.setFieldValue(field.name, val);
                      setState({ ...state, abono: Number(val) });
                    }}
                    field={field}
                    form={form}
                  />
                )}
              </Field>
            </ModalBody>

            <ModalFooter>
              <Flex justify="space-between" alignItems="flex-end" width="100%">
                <Flex maxWidth="80%" justify="space-between" alignItems="flex-end">
                  <Stat>
                    <StatLabel> Total:</StatLabel>
                    <StatNumber>{state.total}$</StatNumber>
                  </Stat>
                  <Stat marginLeft="0.5em">
                    <StatLabel> Restante por pagar:</StatLabel>
                    <StatNumber>{state.monto}$</StatNumber>
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

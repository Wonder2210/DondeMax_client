import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Textarea,
} from "@chakra-ui/core";

import x from "@iconify/icons-cil/x-circle";
import Plus from "@iconify/icons-cil/plus";
import * as Yup from "yup";
import { IconButton } from "@/atoms/Buttons";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import { FormInput, DropImage, DynamicInput, SelectInput } from "@/atoms/Inputs";
import { Table } from "../Table";

type props = {
  values: {
    materials?: Array<{
        id:number| string;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  onEdit: (data: Object) => void;
  isEditing: Boolean;
  materialList: Array<{ id: number; type: string }>;
  typeList: Array<{ id: number; type: string }>;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  image: Yup.mixed().required(),
  price: Yup.number().required(),
  materials: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.number().required(),
        quantity: Yup.number().required(),
        name: Yup.string(),
      })
      .required(),
  ),
});

const Products: React.FC<props> = ({
  isOpen,
  onClose,
  onSubmit,
  onEdit,
  values,
  materialList,
  typeList,
  isEditing,
}) => {
  const defaultState = {
    data: [...materialList],
  };
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    if (isEditing) {
      setState({
        data: state.data.filter((i) => {
          let val = values.materials.find((item) => Number(item.id) == Number(i.id));
          console.log(val);
          if (val) {
            return false;
          }
          return true;
        }),
      });
    }
  }, [isEditing]);
  const AddToList = (set, value, last) => {
    setState((lastState) => ({
      data: lastState.data.filter((i) => Number(i.id) !== Number(value.id)),
    }));

    set("materials", [...last, value]);
  };
  const RemoveFromList = (set, { id, name }, last) => {
    setState((lastState) => ({
      data: lastState.data.concat({ id: id, type: name }),
    }));

    set(
      "materials",
      last.filter((i) => Number(i.id) !== Number(id)),
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setState({ ...defaultState });
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? `Editando ` : "Agrega nuevo Producto"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            setState({ ...defaultState });
            if (isEditing) {
              onEdit(data);
              return;
            }
            onSubmit(data);
          }}
        >
          <Form>
            <ModalBody>
              <Flex align="center">
                <Flex marginRight="1em" w="40%" flexGrow={0.5}>
                  <Field name="image">
                    {({ field, form }) => (
                      <DropImage image={field.value} onChange={(e) => form.setFieldValue(field.name, e)} />
                    )}
                  </Field>
                </Flex>
                <Field name="name">
                  {({ field, form }) => (
                    <FormInput
                      id="name"
                      isInvalid={form.errors.name && form.touched.name}
                      label="Nombre:"
                      type="text"
                      field={field}
                      placeHolder="nombre"
                      variant="flushed"
                      errorMessage={form.errors.name}
                    />
                  )}
                </Field>
              </Flex>
              <Field name="price">
                {({ field, form }) => (
                  <FormInput
                    id="price"
                    isInvalid={form.errors.price && form.touched.price}
                    label="Precio:"
                    type="number"
                    field={field}
                    placeHolder="Precio en $"
                    variant="flushed"
                    errorMessage={form.errors.price}
                  />
                )}
              </Field>
              <Field name="type">
                {({ field, form }) => (
                  <SelectInput
                    placeholder="Tipo"
                    options={typeList}
                    id="type"
                    field={field}
                    isInvalid={form.errorstype && form.touched.type}
                    label="Tipo:"
                    variant="flushed"
                    errorMessage={form.errors.name}
                  />
                )}
              </Field>
              <Field name="materials">
                {({ field, form }) => (
                  <>
                    <DynamicInput
                      options={state.data}
                      placeholder="Materiales:"
                      variant="flushed"
                      add={(e) => AddToList(form.setFieldValue, e, field.value)}
                    />
                    {field.value.length >= 1 && (
                      <Table
                        data={field.value}
                        columns={[
                          {
                            Header: "Material",
                            accessor: "name",
                          },
                          {
                            Header: "Cantidad",
                            accessor: "quantity",
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
              <Field name="info">{({ field, form }) => <Textarea variant="flushed" size="sm" {...field} />}</Field>
            </ModalBody>

            <ModalFooter>
              <IconButton
                type="submit"
                aria-label="add-more"
                backgroundColor="colors.rose.600"
                icon={<Icon icon={Plus} color="white" />}
              />
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default Products;

import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";
import Plus from "@iconify/icons-cil/plus";
import * as Yup from "yup";
import { IconButton } from "@/atoms/Buttons";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import { FormInput, SelectInput } from "@/atoms/Inputs";

type props = {
  values: {};
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  onEdit: (data: Object) => void;
  isEditing: Boolean;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(VALIDATION_MESSAGE),
  cedula: Yup.string()
    .trim()
    .required(VALIDATION_MESSAGE)
    .typeError("Dato invalido")
    .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
  nationality: Yup.string().required(VALIDATION_MESSAGE),
  phone: Yup.number()
    .required(VALIDATION_MESSAGE)
    .typeError("Dato invalido")
    .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
});

const CreateClient: React.FC<props> = ({ isOpen, onClose, values, onSubmit, isEditing, onEdit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? `Editando cliente` : "Agrega nuevo CreateClient"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={(data) => (isEditing ? onEdit(data) : onSubmit(data))}
        >
          <Form>
            <ModalBody>
              <Field name="name">
                {({ field, form }) => (
                  <FormInput
                    id="nombre"
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
              <Field name="cedula">
                {({ field, form }) => (
                  <FormInput
                    id="cedula"
                    isInvalid={form.errors.cedula && form.touched.cedula}
                    label="Cedula:"
                    type="text"
                    field={field}
                    placeHolder="cedula"
                    variant="flushed"
                    errorMessage={form.errors.cedula}
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field, form }) => (
                  <FormInput
                    id="phone"
                    isInvalid={form.errors.phone && form.touched.phone}
                    label="Telefono:"
                    type="text"
                    field={field}
                    placeHolder="Telefono"
                    variant="flushed"
                    errorMessage={form.errors.phone}
                  />
                )}
              </Field>
              <Field name="nationality">
                {({ field, form }) => (
                  <FormInput
                    id="nationality"
                    isInvalid={form.errors.nationality && form.touched.nationality}
                    label="Nacionalidad:"
                    type="text"
                    field={field}
                    placeHolder="nacionalidad ej Venezolano , colombiano"
                    variant="flushed"
                    errorMessage={form.errors.nationality}
                  />
                )}
              </Field>
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

export default CreateClient;

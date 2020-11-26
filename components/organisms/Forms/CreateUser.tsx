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
  typeList: Array<{ id: number; type: string }>;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required(VALIDATION_MESSAGE),
  cedula: Yup.string().required(VALIDATION_MESSAGE),
  nacionalidad: Yup.string().required(VALIDATION_MESSAGE),
  telefono: Yup.string().required(VALIDATION_MESSAGE),
});

const Material: React.FC<props> = ({ isOpen, onClose, values, onSubmit, isEditing, onEdit, typeList }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? `Editando ${values.nombre}` : "Agrega nuevo Material"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={(data) => (isEditing ? onEdit(data) : onSubmit(data))}
        >
          <Form>
            <ModalBody>
              <Field name="nombre">
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
              <Field name="email">
                {({ field, form }) => (
                  <FormInput
                    id="nombre"
                    isInvalid={form.errors.name && form.touched.name}
                    label="Nombre:"
                    type="email"
                    field={field}
                    placeHolder="nombre"
                    variant="flushed"
                    errorMessage={form.errors.name}
                  />
                )}
              </Field>
              <Field name="telefono">
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
              <Field name="contrase">
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

export default Material;

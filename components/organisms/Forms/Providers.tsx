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
import { FormInput } from "@/atoms/Inputs";

type props = {
  values: {};
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  onEdit: (data: Object) => void;
  isEditing: Boolean;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_MESSAGE),
  RIF: Yup.string().required(VALIDATION_MESSAGE),
  phone: Yup.string().required(VALIDATION_MESSAGE).matches(phoneRegExp, "Este numero es incorrecto").min(8),
  direction: Yup.string().required(VALIDATION_MESSAGE),
});

const Providers: React.FC<props> = ({ isOpen, onClose, values, onSubmit, isEditing, onEdit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? `Editando ${values.name}` : "Agrega nuevo Proveedor"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={values ?? {}}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            if (isEditing) {
              onEdit(data);
              return;
            }
            onSubmit(data);
          }}
        >
          <Form>
            <ModalBody>
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
              <Field name="RIF">
                {({ field, form }) => (
                  <FormInput
                    id="RIF"
                    field={field}
                    isInvalid={form.errors.RIF && form.touched.RIF}
                    errorMessage={form.errors.RIF}
                    label="RIF:"
                    type="text"
                    placeHolder="rif"
                    variant="flushed"
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field, form }) => (
                  <FormInput
                    id="phone"
                    isInvalid={form.errors.phone && form.touched.phone}
                    errorMessage={form.errors.phone}
                    label="Telefono:"
                    field={field}
                    type="text"
                    placeHolder="phone"
                    variant="flushed"
                  />
                )}
              </Field>
              <Field name="direction">
                {({ field, form }) => (
                  <FormInput
                    id="direction"
                    isInvalid={form.errors.direction && form.touched.direction}
                    errorMessage={form.errors.direction}
                    label="Direccion:"
                    type="text"
                    field={field}
                    placeHolder="direccion"
                    variant="flushed"
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

export default Providers;

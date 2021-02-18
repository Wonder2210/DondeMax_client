import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Plus from "@iconify/icons-cil/plus";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import { FormInput, SelectInput } from "../../atoms/Inputs";
import { IconButton } from "../../atoms/Buttons";

type props = {
  values: object;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  onEdit: (data: Object) => void;
  isEditing: Boolean;
  typeList?: Array<{ id: string; type: string }>;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(VALIDATION_MESSAGE),
  last_name: Yup.string().required(VALIDATION_MESSAGE),
  email: Yup.string().email("Introduce un email valido").required(VALIDATION_MESSAGE),
  phone: Yup.string().required(VALIDATION_MESSAGE),
  password: Yup.string().required(VALIDATION_MESSAGE),
  role: Yup.string(),
});

const CreateUser: React.FC<props> = ({ isOpen, onClose, values, onSubmit, isEditing, onEdit, typeList }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? `Editando Usuario` : "Agrega nuevo Usuario"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={values ?? {}}
          validationSchema={validationSchema}
          onSubmit={(data) => (isEditing ? onEdit(data) : onSubmit(data))}
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
              <Field name="last_name">
                {({ field, form }) => (
                  <FormInput
                    id="last_name"
                    isInvalid={form.errors.last_name && form.touched.last_name}
                    label="Apellido:"
                    type="text"
                    field={field}
                    placeHolder="apellido"
                    variant="flushed"
                    errorMessage={form.errors.last_name}
                  />
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormInput
                    id="email"
                    isInvalid={form.errors.email && form.touched.email}
                    label="Email:"
                    type="email"
                    field={field}
                    placeHolder="email"
                    variant="flushed"
                    errorMessage={form.errors.email}
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
                    placeHolder="phone"
                    variant="flushed"
                    errorMessage={form.errors.phone}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormInput
                    id="password"
                    isInvalid={form.errors.password && form.touched.password}
                    label="Contraseña:"
                    type="text"
                    field={field}
                    placeHolder="contraseña"
                    variant="flushed"
                    errorMessage={form.errors.password}
                  />
                )}
              </Field>
              {typeList && (
                <Field name="role">
                  {({ field, form }) => (
                    <SelectInput
                      placeholder="Rol"
                      options={typeList}
                      id="rol"
                      field={field}
                      isInvalid={form.errors.role && form.touched.role}
                      label="Rol:"
                      variant="flushed"
                      errorMessage={form.errors.role}
                    />
                  )}
                </Field>
              )}
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

export default CreateUser;

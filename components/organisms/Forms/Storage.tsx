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
import { Form, Formik, Field } from "formik";
import { Icon } from "@iconify/react";
import { IconButton } from "../../atoms/Buttons";
import { FormInput, SelectInput, NumberInput, DateInput } from "../../atoms/Inputs";

type props = {
  values: {};
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
  onEdit: (data: Object) => void;
  isEditing: Boolean;
  materialList: Array<{ id: number; type: string }>;
  providersList: Array<{ id: number; type: string }>;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  uniteds: Yup.number().required(VALIDATION_MESSAGE),
  united_weight: Yup.number().required(VALIDATION_MESSAGE),
  weight: Yup.number().required(VALIDATION_MESSAGE),
  brand: Yup.string().required(VALIDATION_MESSAGE),
  expirationDate: Yup.string().required(VALIDATION_MESSAGE),
  materialId: Yup.string().required(VALIDATION_MESSAGE),
  providerId: Yup.string().required(VALIDATION_MESSAGE),
});

const Storage: React.FC<props> = ({
  isOpen,
  onClose,
  values,
  onSubmit,
  providersList,
  isEditing,
  onEdit,
  materialList,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Agrega nuevas existencias"}</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={values} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <ModalBody>
              <Field name="uniteds">
                {({ field, form }) => (
                  <NumberInput
                    id="uniteds"
                    isInvalid={form.errors.uniteds && form.touched.uniteds}
                    label="Unidades:"
                    variant="flushed"
                    onChange={(e) => form.setFieldValue(field.name, e)}
                    errorMessage={form.errors.uniteds}
                  />
                )}
              </Field>
              <Field name="weight">
                {({ field, form }) => (
                  <FormInput
                    id="weight"
                    isInvalid={form.errors.weight && form.touched.weight}
                    label="Peso:"
                    type="number"
                    field={field}
                    placeHolder="peso en KG"
                    variant="flushed"
                    errorMessage={form.errors.weight}
                  />
                )}
              </Field>
              <Field name="united_weight">
                {({ field, form }) => (
                  <FormInput
                    id="united_weight"
                    isInvalid={form.errors.weight && form.touched.united_weight}
                    label="Peso por unidad:"
                    type="number"
                    field={field}
                    placeHolder="peso en KG"
                    variant="flushed"
                    errorMessage={form.errors.united_weight}
                  />
                )}
              </Field>
              <Field name="brand">
                {({ field, form }) => (
                  <FormInput
                    id="brand"
                    isInvalid={form.errors.brand && form.touched.brand}
                    label="Marca:"
                    type="text"
                    field={field}
                    placeHolder="marca"
                    variant="flushed"
                    errorMessage={form.errors.brand}
                  />
                )}
              </Field>
              <Field name="expirationDate">
                {({ field, form }) => (
                  <DateInput
                    id="expirationDate"
                    label="Fecha de Vencimiento"
                    errorMessage={form.errors.expirationDate}
                    isInvalid={form.errors.expirationDate && form.touched.expirationDate}
                    form={form}
                    field={field}
                  />
                )}
              </Field>
              <Field name="materialId">
                {({ field, form }) => (
                  <SelectInput
                    placeholder="Material"
                    options={materialList}
                    id="materialId"
                    field={field}
                    isInvalid={form.errors.materialId && form.touched.materialId}
                    label="Material:"
                    variant="flushed"
                    errorMessage={form.errors.materialId}
                  />
                )}
              </Field>
              <Field name="providerId">
                {({ field, form }) => (
                  <SelectInput
                    placeholder="Proveedor"
                    options={providersList}
                    id="providerId"
                    field={field}
                    isInvalid={form.errors.providerId && form.touched.providerId}
                    label="Proveedor:"
                    variant="flushed"
                    errorMessage={form.errors.providerId}
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

export default Storage;

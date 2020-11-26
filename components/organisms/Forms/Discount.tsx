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
import { IconButton } from "@/atoms/Buttons";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import x from "@iconify/icons-cil/x";
import { DynamicProductType, SelectInput, DateInput, NumberInput } from "@/atoms/Inputs";
import { Table } from "../Table";

type props = {
  state: {
    stage?: {
      id: number;
      uniteds: number;
      weight: number;
    };
    store?: {
      id: number;
      uniteds: number;
      weight: number;
      weight_united: number;
      
    };
    materialsStage?: Array<{
      id: number;
      material_id: number;
      name: string;
      uniteds: number;
      weight: number;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Object) => void;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  deliveryDate: Yup.string().required(VALIDATION_MESSAGE),
  client: Yup.number().required(VALIDATION_MESSAGE),
  payMethod: Yup.string().required(VALIDATION_MESSAGE),
  note: Yup.string(),
  products: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      price: Yup.number(),
      quantity: Yup.number(),
      total: Yup.number(),
    }),
  ),
});

const ExecuteOrder: React.FC<props> = ({ isOpen, onClose, state, onSubmit }) => {

 
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Descontar mercancia"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            products: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            onSubmit({newWeight});
            close();
          }}
        >
          <Form>
            <ModalBody>
              <Field name="discount">
                {({ form, field }) => (
                  <NumberInput
                    label="Unidades a agregar"
                    id="discount"
                    form={form}
                    variant="flushed"
                    errorMessage={form.errors.discount}
                    field={field}
                    isInvalid={form.errors.discount && form.touched.discount}
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

export default ExecuteOrder;

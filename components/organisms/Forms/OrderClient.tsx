import * as React from "react";
import { Textarea, FormControl, FormLabel, Box } from "@chakra-ui/react";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import shop from "@iconify/icons-cil/cart";
import { Form, Formik, Field } from "formik";
import { SelectInput, DateInput, TimeInput } from "../../atoms/Inputs";
import { Button } from "../../atoms/Buttons";
import Language from "../../../locales";

type props = {
  onSubmit: (data: Object) => void;
  total: number;
  disabled: boolean;
  isLoading: boolean;
  lang: string;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  deliveryDate: Yup.string().required(VALIDATION_MESSAGE),
  deliveryTime: Yup.string().required(),
  payMethod: Yup.string().required(VALIDATION_MESSAGE),
  note: Yup.string(),
});

const OrderClient: React.FC<props> = ({ onSubmit, isLoading, lang, disabled }) => {
  const {
    forms: { orderClient },
    cart,
  } = Language(lang);
  const payMethod = ["EFECTIVO", "DEBITO", "TRANSFERENCIA", " DOLARES", "PESOS"].map((i) => ({
    id: i,
    type: i,
  }));

  return (
    <Box w="100%">
      <Formik
        initialValues={{
          deliveryDate: "",
          payMethod: "",
          note: "",
          deliveryTime: "13:00:00",
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => onSubmit(data)}
      >
        <Form>
          <Field name="deliveryDate">
            {({ field, form }) => (
              <DateInput
                id="deliveryDate"
                label={orderClient.deliveryDate}
                errorMessage={form.errors.deliveryDate}
                isInvalid={form.errors.deliveryDate && form.touched.deliveryDate}
                form={form}
                field={field}
                disabled={disabled}
              />
            )}
          </Field>
          <Field name="deliveryTime">
            {({ field, form }) => (
              <TimeInput
                id="deliveryDate"
                field={field}
                label="Hora"
                name="deliveryDate"
                onChange={(val: string) => form.setFieldValue(field.name, val)}
                value={field.value}
                errorMessage={form.errors.deliveryTime}
                isInvalid={form.errors.deliveryTime && form.touched.deliveryTime}
                disabled={disabled}
              />
            )}
          </Field>

          <Field name="payMethod">
            {({ field, form }) => (
              <SelectInput
                placeholder={orderClient.payMethod}
                options={payMethod}
                id="mthod"
                field={field}
                isInvalid={form.errors.payMethod && form.touched.payMethod}
                label={`${orderClient.payMethod}:`}
                variant="flushed"
                errorMessage={form.errors.payMethod}
                disabled={disabled}
              />
            )}
          </Field>
          <Field name="note">
            {({ field, form }) => (
              <FormControl isDisabled={disabled}>
                <FormLabel>{orderClient.note}</FormLabel>
                <Textarea size="sm" id="note" {...field} />
              </FormControl>
            )}
          </Field>

          <Button
            type="submit"
            backgroundColor="colors.rose.600"
            size="xl"
            width="100%"
            height="2.5em"
            borderRadius="12px"
            rightIcon={<Icon icon={shop} width="1.7em" height="1.7em" />}
            isLoading={isLoading}
            disabled={disabled}
          >
            {cart.buy}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default OrderClient;

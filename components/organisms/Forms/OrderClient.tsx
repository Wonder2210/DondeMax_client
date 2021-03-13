import * as React from "react";
import { Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import shop from "@iconify/icons-cil/cart";
import { Form, Formik, Field, useFormikContext } from "formik";
import { SelectInput, DateInput } from "../../atoms/Inputs";
import { Button } from "../../atoms/Buttons";
import { Table } from "../Table";
import Language from "../../../locales";

type props = {
  onSubmit: (data: Object) => void;
  total: number;
  isLoading: boolean;
  productsList: Array<{ id: number; name: string; price: number; quantity: number; total: number }>;
  lang: string;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  deliveryDate: Yup.string().required(VALIDATION_MESSAGE),

  payMethod: Yup.string().required(VALIDATION_MESSAGE),
  note: Yup.string(),
});

const OrderClient: React.FC<props> = ({ onSubmit, isLoading, productsList, lang }) => {
  const {
    forms: { orderClient },
    cart,
  } = Language(lang);
  const payMethod = ["EFECTIVO", "DEBITO", "TRANSFERENCIA", " DOLARES", "PESOS"].map((i) => ({
    id: i,
    type: i,
  }));

  return (
    <Formik
      initialValues={{
        deliveryDate: "",
        payMethod: "",
        note: "",
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
            />
          )}
        </Field>
        <Field name="note">
          {({ field, form }) => (
            <FormControl>
              <FormLabel>{orderClient.note}</FormLabel>
              <Textarea variant="flushed" size="sm" id="note" {...field} />
            </FormControl>
          )}
        </Field>
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
        <Button
          type="submit"
          backgroundColor="colors.rose.600"
          size="xl"
          width="100%"
          height="2.5em"
          borderRadius="12px"
          rightIcon={<Icon icon={shop} width="1.7em" height="1.7em" />}
          isLoading={isLoading}
        >
          {cart.buy}
        </Button>
      </Form>
    </Formik>
  );
};

export default OrderClient;

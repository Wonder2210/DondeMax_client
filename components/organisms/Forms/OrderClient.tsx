import * as React from "react";
import { Textarea, FormControl, FormLabel } from "@chakra-ui/core";
import * as Yup from "yup";
import { Form, Formik, Field, useFormikContext } from "formik";
import { SelectInput, DateInput } from "../../atoms/Inputs";
import { Table } from "../Table";

type props = {
  onSubmit: (data: Object) => void;
  total: number;
  isSubmiting: boolean;
  productsList: Array<{ id: number; name: string; price: number; quantity: number; total: number }>;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  deliveryDate: Yup.string().required(VALIDATION_MESSAGE),

  payMethod: Yup.string().required(VALIDATION_MESSAGE),
  note: Yup.string(),
});

const SubmitForm: React.FC<{
  isSubmiting: boolean;
}> = ({ isSubmiting }) => {
  const { values, submitForm, isValid } = useFormikContext();
  React.useEffect(() => {
    if (isValid && isSubmiting) {
      submitForm();
    }
  }, [values, submitForm, isSubmiting]);
  return null;
};

const OrderClient: React.FC<props> = ({ onSubmit, isSubmiting, productsList }) => {
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
              label="Fecha de Entrega"
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
              placeholder="Metodo de pago"
              options={payMethod}
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
            <FormControl>
              <FormLabel>Nota:</FormLabel>
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
        <SubmitForm isSubmiting={isSubmiting} />
      </Form>
    </Formik>
  );
};

export default OrderClient;

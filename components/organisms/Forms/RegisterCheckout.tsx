import * as React from "react";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { Button } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";
import Languages from "../../../locales";

type props = {
  values: {};
  onSubmit: (data: Object) => void;
  isLoading: boolean;
  lang: string;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(VALIDATION_MESSAGE),
  last_name: Yup.string().trim().required(VALIDATION_MESSAGE),
  email: Yup.string().trim().required(VALIDATION_MESSAGE),
  password: Yup.string().trim().required(VALIDATION_MESSAGE),
  phone: Yup.number()
    .required(VALIDATION_MESSAGE)
    .typeError("Dato invalido")
    .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
});

const CreateClient: React.FC<props> = ({ values = {}, onSubmit, lang, isLoading }) => {
  const {
    forms: { signUpClient },
  } = Languages(lang);
  return (
    <Formik initialValues={values} validationSchema={validationSchema} onSubmit={(data) => onSubmit(data)}>
      <Form>
        <Field name="name">
          {({ field, form }) => (
            <FormInput
              id="name"
              isInvalid={form.errors.name && form.touched.name}
              label={signUpClient.name}
              type="text"
              field={field}
              placeHolder={signUpClient.name}
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
              label={signUpClient.last_name}
              type="text"
              field={field}
              placeHolder={signUpClient.last_name}
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
              label={signUpClient.email}
              type="email"
              field={field}
              placeHolder={signUpClient.email}
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
              label={signUpClient.phone}
              type="text"
              field={field}
              placeHolder={signUpClient.phone}
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
              label={signUpClient.password}
              type="text"
              field={field}
              placeHolder={signUpClient.password}
              variant="flushed"
              errorMessage={form.errors.password}
            />
          )}
        </Field>

        <Button
          type="submit"
          backgroundColor="colors.rose.600"
          size="md"
          width="100%"
          height={{ base: "2.5em" }}
          isLoading={isLoading}
          loadingText="Cargando"
          borderRadius="12px"
          _hover={{ transform: "scale(1.05)" }}
        >
          {signUpClient.signUp}
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateClient;

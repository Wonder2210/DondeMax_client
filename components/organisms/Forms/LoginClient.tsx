import React from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";
import Languages from "../../../locales";

type FormValidation = {
  password: string;
  email: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Este campo no debe ser vacio"),
  password: Yup.string().required("Este campo no puede ser vacio"),
});

type props = {
  isLoading?: boolean;
  lang: string;
  onLogin: (values: { email: string; password: string }) => void;
};

const LoginClient: React.FC<props> = ({ isLoading, onLogin, lang }) => {
  const {
    forms: { loginClient },
  } = Languages(lang);
  const initialValues: FormValidation = {
    password: "",
    email: "",
  };
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={(values) => onLogin(values)}>
      <Form>
        <Field name="email">
          {({ field, form }) => (
            <FormInput
              id="email"
              isInvalid={form.errors.cedula && form.touched.cedula}
              type="email"
              label={`${loginClient.email}:`}
              placeHolder={loginClient.email}
              variant="flushed"
              field={field}
              errorMessage={form.errors.email}
            />
          )}
        </Field>
        <Field name="password">
          {({ field, form }) => (
            <FormInput
              id="password"
              isInvalid={form.errors.password && form.touched.password}
              type="password"
              label={`${loginClient.password}:`}
              placeHolder={loginClient.password}
              variant="flushed"
              field={field}
              errorMessage={form.errors.password}
            />
          )}
        </Field>
        <Flex justifyContent="center">
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
            {loginClient.submit}
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default LoginClient;

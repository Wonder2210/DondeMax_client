import React from "react";
import { Flex } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";

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
  onLogin: (values: { email: string; password: string }) => void;
};

const LoginClient: React.FC<props> = ({ isLoading, onLogin }) => {
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
              label="Email:"
              type="email"
              placeHolder="email"
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
              label="password:"
              type="password"
              placeHolder="Password"
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
            Ingresar
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default LoginClient;

import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import { Button } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import { FormInput } from "../../atoms/Inputs";

import * as Yup from "yup";

type FormValidation = {
  password: string;
  cedula?: number;
};

const validationSchema = Yup.object().shape({
  cedula: Yup.number().required("Este campo no debe ser vacio"),
  password: Yup.string().required("Este campo no puede ser vacio"),
});

const Login = () => {
  const initialValues: FormValidation = {
    password: "",
  };
  return (
    <Flex
      direction="column"
      borderRadius="35px"
      width={{ md: "20em", xl: "25em" }}
      padding="3em"
      boxShadow=" 6px 6px 6px 2px rgba(0, 0, 0, 0.25)"
      align="center"
      minHeight="50vh"
    >
      <Box marginY="1.5em">
        <SubHeader>Inicia sesion</SubHeader>
      </Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values, "values");
        }}
      >
        <Form>
          <Field name="cedula">
            {({ field, form }) => (
              <FormInput
                id="cedula"
                isInvalid={form.errors.cedula && form.touched.cedula}
                label="Cedula:"
                type="number"
                placeHolder="cedula"
                variant="flushed"
                field={field}
                errorMessage={form.errors.cedula}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormInput
                id="password"
                isInvalid={form.errors.password && form.touched.password}
                label="password:"
                type="number"
                placeHolder="Password"
                variant="flushed"
                field={field}
                errorMessage={form.errors.password}
              />
            )}
          </Field>
          <Button
            type="submit"
            backgroundColor="colors.rose.600"
            size="md"
            width={{ base: "12em" }}
            height={{ base: "2.5em" }}
            _hover={{ transform: "scale(1.05)" }}
          >
            Ingresar
          </Button>
        </Form>
      </Formik>
    </Flex>
  );
};

export default Login;

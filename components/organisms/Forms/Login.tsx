import * as React from "react";
import { Flex, Box, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import { FormInput } from "../../atoms/Inputs";

type FormValidation = {
  password: string;
  email: string;
};

type props = {
  onSubmit: (e: FormValidation) => void;
  onOpen: () => void;
  isLoading: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Este campo no debe ser vacio"),
  password: Yup.string().required("Este campo no puede ser vacio"),
});

const Login: React.FC<props> = ({ onSubmit, onOpen, isLoading }) => {
  const initialValues: FormValidation = {
    password: "",
    email: "",
  };

  return (
    <Flex
      direction="column"
      borderRadius="35px"
      width={{ md: "24em", xl: "30em" }}
      padding="3em"
      align="center"
      minHeight="min(50vh , 29em)"
    >
      <Box marginY="1.5em">
        <SubHeader fontSize="2.5em">Inicia sesion</SubHeader>
      </Box>
      <Box width="100%">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
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
                _hover={{ transform: "scale(1.05)" }}
              >
                Ingresar
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Box>
      <p
        style={{
          textAlign: "center",
        }}
      >
        ¿ No estas registrado ? Si eres cliente
        <br />
        <button
          type="button"
          style={{
            color: "#fe4674",
          }}
          onClick={onOpen}
        >
          Registraste aqui
        </button>
      </p>
    </Flex>
  );
};

export default Login;

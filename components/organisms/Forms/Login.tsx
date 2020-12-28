import * as React from "react";
import { Flex, Box, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import { FormInput } from "../../atoms/Inputs";

type FormValidation = {
  password: string;
  email: string;
};
type FormValidationClient = {
  cedula: string;
};

type props = {
  onSubmit: (e: FormValidation) => void;
  onSubmitClient: (e: FormValidationClient) => void;
  onOpen: () => void;
  isLoading: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Este campo no debe ser vacio"),
  password: Yup.string().required("Este campo no puede ser vacio"),
});
const validationSchemaClient = Yup.object().shape({
  cedula: Yup.string().required("Este campo no debe ser vacio"),
});

const Login: React.FC<props> = ({ onSubmit, onSubmitClient, onOpen, isLoading }) => {
  const initialValues: FormValidation = {
    password: "",
    email: "",
  };

  const initialValuesClient: FormValidationClient = { cedula: "" };
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
      <Tabs width="100%" transition="all 0.5s ease-in">
        <TabList>
          <Tab>Usuario</Tab>
          <Tab>Cliente</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
                    loadingText="Cragando"
                    _hover={{ transform: "scale(1.05)" }}
                  >
                    Ingresar
                  </Button>
                </Flex>
              </Form>
            </Formik>
          </TabPanel>
          <TabPanel>
            <Formik
              validationSchema={validationSchemaClient}
              initialValues={initialValuesClient}
              onSubmit={(values) => {
                console.log(values);
                onSubmitClient(values);
              }}
            >
              <Form>
                <Field name="cedula">
                  {({ field, form }) => (
                    <FormInput
                      id="cedula"
                      isInvalid={form.errors.cedula && form.touched.cedula}
                      label="Cedula:"
                      type="text"
                      placeHolder="cedula"
                      variant="flushed"
                      field={field}
                      errorMessage={form.errors.cedula}
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
                    _hover={{ transform: "scale(1.05)" }}
                    isLoading={isLoading}
                    loadingText="Cargando"
                  >
                    Ingresar
                  </Button>
                </Flex>
              </Form>
            </Formik>
          </TabPanel>
        </TabPanels>
      </Tabs>
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

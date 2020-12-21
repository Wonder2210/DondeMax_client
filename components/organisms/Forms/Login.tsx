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
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Este campo no debe ser vacio"),
  password: Yup.string().required("Este campo no puede ser vacio"),
});
const validationSchemaClient = Yup.object().shape({
  cedula: Yup.string().required("Este campo no debe ser vacio"),
});

const Login: React.FC<props> = ({ onSubmit, onSubmitClient }) => {
  const initialValues: FormValidation = {
    password: "",
    email: "",
  };

  const initialValuesClient: FormValidationClient = { cedula: "" };
  return (
    <Flex
      direction="column"
      borderRadius="35px"
      width={{ md: "20em", xl: "25em" }}
      padding="3em"
      boxShadow=" 6px 6px 6px 2px rgba(0, 0, 0, 0.25)"
      align="center"
      minHeight="min(50vh , 29em)"
    >
      <Box marginY="1.5em">
        <SubHeader>Inicia sesion</SubHeader>
      </Box>
      <Tabs>
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
                console.log(values);
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Login;

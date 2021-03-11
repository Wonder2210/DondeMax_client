/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import { FormInput } from "../../atoms/Inputs";
import Languages from "../../../locales";

type FormValidation = {
  password: string;
  email: string;
};

type props = {
  onSubmit: (e: FormValidation) => void;
  isLoading: boolean;
  lang: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Este campo no debe ser vacio"),
  password: Yup.string().required("Este campo no puede ser vacio"),
});

const Login: React.FC<props> = ({ onSubmit, lang, isLoading }) => {
  const initialValues: FormValidation = {
    password: "",
    email: "",
  };
  const {
    forms: { loginClient },
    login,
  } = Languages(lang);

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
        <SubHeader fontSize="2.5em">{loginClient.logIn}</SubHeader>
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
                _hover={{ transform: "scale(1.05)" }}
              >
                {loginClient.submit}
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
        {login.noAccount}
        <br />
        <Link passHref href="/register">
          <a
            style={{
              color: "#fe4674",
            }}
          >
            {login.signUpHere}
          </a>
        </Link>
      </p>
    </Flex>
  );
};

export default Login;

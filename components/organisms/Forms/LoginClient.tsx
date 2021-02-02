import React from "react";
import { Flex } from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";

const validationSchema = Yup.object().shape({
  cedula: Yup.number(),
});

type props = {
  isLoading?: boolean;
  onLogin: (value: string) => void;
};

const LoginClient: React.FC<props> = ({ isLoading, onLogin }) => {
  const initialValues = React.useMemo(
    () => ({
      cedula: null,
    }),
    [],
  );
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={({ cedula }) => onLogin(cedula)}
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
  );
};

export default LoginClient;

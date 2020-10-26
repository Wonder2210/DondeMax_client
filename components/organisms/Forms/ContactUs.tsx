import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../atoms/Inputs";
import { Button } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";

type MyFormValues = {
  name: string;
  email: string;
  details: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(" Este campo es obligatorio"),
  email: Yup.string().email("Email ivalido").required(),
  details: Yup.string().max(50, "Es muy largo este mensaje"),
});

const ContactUs = () => {
  const initialValues: MyFormValues = {
    name: "",
    email: "",
    details: "",
  };
  return (
    <Flex
      direction="column"
      borderRadius="35px"
      width={{ md: "20em", xl: "25em" }}
      padding="3em"
      boxShadow=" 6px 6px 6px 2px rgba(0, 0, 0, 0.25)"
      align="center"
    >
      <Box marginY="1.5em">
        <SubHeader>Contactanos</SubHeader>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values, "values");
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <Field name="name">
            {({ field, form }) => (
              <FormInput
                id="name"
                isInvalid={form.errors.name && form.touched.name}
                label="Nombre:"
                type="text"
                placeHolder="nombre"
                variant="flushed"
                field={field}
                errorMessage={form.errors.name}
              />
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <FormInput
                id="email"
                isInvalid={form.errors.email && form.touched.email}
                label="Email"
                type="email"
                placeHolder="email"
                variant="flushed"
                field={field}
                errorMessage={form.errors.email}
              />
            )}
          </Field>
          <Field name="details">
            {({ field, form }) => (
              <FormInput
                id="details"
                isInvalid={form.errors.details && form.touched.details}
                label="Asunto"
                type="text"
                placeHolder="asunto"
                variant="flushed"
                errorMessage={form.errors.details}
                field={field}
              />
            )}
          </Field>

          <Button
            type="submit"
            backgroundColor=" #FC913C"
            size="md"
            width={{ base: "12em" }}
            height={{ base: "2.5em" }}
            _hover={{ transform: "scale(1.05)" }}
          >
            Contactanos
          </Button>
        </Form>
      </Formik>
    </Flex>
  );
};

export default ContactUs;

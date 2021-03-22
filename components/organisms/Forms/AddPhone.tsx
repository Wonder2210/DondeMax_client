import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Alert,
  AlertIcon,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { Form, Formik, Field } from "formik";
import { Button, IconButton } from "../../atoms/Buttons";
import { FormInput } from "../../atoms/Inputs";
import Languages from "../../../locales";

type props = {
  values?: { phone?: string };
  completed: boolean;
  width?: string;
  loading: boolean;
  onSubmit: (phone: string) => void;
  lang: string;
};

const VALIDATION_MESSAGE = "Este campo no debe de estar vacio";

const validationSchema = Yup.object().shape({
  phone: Yup.number()
    .required(VALIDATION_MESSAGE)
    .typeError("Dato invalido")
    .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value)),
});

const AddPhone: React.FC<props> = ({ values = { phone: "" }, onSubmit, lang, completed, width = "70%", loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const t = Languages(lang);
  React.useEffect(() => {
    if (completed) onClose();
  }, [completed]);
  return (
    <>
      <Alert status="warning" width={width} marginX="auto">
        <Flex grow={1}>
          <AlertIcon />
          Seems your account is about expire, upgrade now
        </Flex>
        <IconButton
          aria-label="add-phone"
          icon={<Icon icon={Plus} />}
          backgroundColor="transparent"
          onClick={onOpen}
          _active={{
            borderColor: "none",
          }}
          justifySelf="end"
          position="absolute"
          right="1em"
        />
      </Alert>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t.forms.addPhone.add}</ModalHeader>
          <ModalCloseButton />
          <Formik initialValues={values} validationSchema={validationSchema} onSubmit={({ phone }) => onSubmit(phone)}>
            <Form>
              <ModalBody>
                <Field name="phone">
                  {({ field, form }) => (
                    <FormInput
                      id="phone"
                      isInvalid={form.errors.phone && form.touched.phone}
                      label={t.forms.signUpClient.phone}
                      type="text"
                      field={field}
                      placeHolder={t.forms.signUpClient.phone}
                      variant="flushed"
                      errorMessage={form.errors.phone}
                    />
                  )}
                </Field>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  aria-label="add-more"
                  borderRadius="12px"
                  backgroundColor="colors.rose.600"
                  isLoading={loading}
                >
                  {t.forms.addPhone.add}
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPhone;

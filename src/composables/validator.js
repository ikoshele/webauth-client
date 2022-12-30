import { reactive } from "vue";

export function useValidator(fieldsObject) {
  const errorsState = reactive(fieldsObject);
  const validateFields = (errors) => {
    errors.forEach((invalidField) => {
      errorsState[invalidField.path] = invalidField.message;
    });
  };
  const resetErrors = () => {
    Object.keys(errorsState).forEach((v) => (errorsState[v] = ""));
  };
  return { errorsState, validateFields, resetErrors };
}

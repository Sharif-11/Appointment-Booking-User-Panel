import * as yup from "yup";

const patientSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
});

export default patientSchema;

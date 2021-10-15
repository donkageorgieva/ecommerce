import { Formik, Form, Field, ErrorMessage } from "formik";

const CustomForm = (props) => {
  const fields = props.fields.map((field) => {
    return (
      <div className="my-2 " key={field.name}>
        <label className="form-label"> {field.label} </label>

        <Field
          id={field.id}
          name={field.name}
          placeholder={field.placeholder}
          className="form-control"
          type={field.type}
        />
        <ErrorMessage name={field.name} component="span" className="error" />
      </div>
    );
  });
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
    >
      <Form className="login-form  mt-4 ">
        {fields}
        <button className="btn btn-primary my-2" type="submit">
          {props.btnText}
        </button>
        {props.children}
      </Form>
    </Formik>
  );
};

export default CustomForm;

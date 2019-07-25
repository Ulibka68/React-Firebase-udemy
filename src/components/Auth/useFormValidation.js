import React from "react";

function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  // видео 9 5:02
  // когда errors был обновлен мы смотрим на изменение объекта by running the use effect
  // функция (callback ) запускается тогда, когда errors (второй параметр) изменен
  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log("authenticated", values);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    event.persist();
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  };
}

export default useFormValidation;

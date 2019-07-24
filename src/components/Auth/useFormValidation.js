import React from "react";

function useFormValidation(initialState) {
  const [values, setValues] = React.useState(initialState);

  function handleChange(event) {

    // https://ru.reactjs.org/docs/events.html
        // Если вы всё же хотите обратиться к полям события асинхронно, вам нужно вызвать event.persist() на событии.
        // Тогда оно будет извлечено из пула, что позволит вашему коду удерживать ссылки на это событие.
    //  В видео на 8:10 раздел3 №8 объяснено

    event.persist();
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ values });
  }

  return { handleSubmit, handleChange, values };
}

export default useFormValidation;

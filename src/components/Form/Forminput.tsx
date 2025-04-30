

import React from "react";
import { Form } from "react-bootstrap";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type typeprops<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  label: string;
  error: string | undefined;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  text?: string;
};
function Forminput<TFieldValues extends FieldValues>({
  name,
  register,
  label,
  error,
  onBlur,
  text,
}: typeprops<TFieldValues>) {
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        {...register(name)}
        isInvalid={error ? true : false}
        onBlur={onblurHandler}
      />
      {error && <p className="erroe-form">{error}</p>}
      <p>{text}</p>
    </Form.Group>
  );
}

export default Forminput
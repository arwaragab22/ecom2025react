import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Forminput from "@components/Form/Forminput";
import React, { useEffect, useState } from "react";
import Usecheck from "src/Hooks/Usecheck";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Actregisterauth from "@store/Auth/Actionregister";
import { Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { resetauth } from "@store/Auth/Authslice";

function Register() {
    const dispatch = useAppDispatch();

    useEffect(() => {
      return () => {
        dispatch(resetauth())
      }
    },[dispatch])
  const navigate = useNavigate();
  const { checkemailfun, statecheck, enteredEmail } = Usecheck();
  const { error,loading,accessToken}=useAppSelector(state=>state.Authslice)
console.log("register")
  const Forminputschema = z
    .object({
      Fname: z.string().min(1, { message: "FName is required" }),
      Lname: z.string().min(1, { message: "LName is required" }),
      Email: z.string().min(1, { message: "Email is required" }).email(),
      Password: z
        .string()
        .min(1, { message: "Password is required" })
        .regex(/.*[`~<>?,./!@#$%^&*()\-_+="'|{}\[\];:\\].*/, {
          message: "Must be at least 1 special character ",
        }),
      Confirmpassword: z
        .string()
        .min(1, { message: "Confirmpassword is required" }),
    })
    .refine((data) => data.Password === data.Confirmpassword, {
      message: "Passwords do not match",
      path: ["Confirmpassword"],
    });
  type Forminput = z.infer<typeof Forminputschema>;

  const {
    register,
    handleSubmit,
    trigger,
    getFieldState,
    formState: { isDirty, isValid },
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Forminputschema),
    mode: "onBlur", // 👈 Validate on every keystroke
  });
  type a={
    Fname: string;
    Lname: string;
    Email: string;
    Password: string;
    Confirmpassword: string;
}
  const onSubmit: SubmitHandler<Forminput> = (data) => {
    console.log(data);
    dispatch(Actregisterauth(data)).unwrap().then(() => {
navigate("/login?message=account-created");
})  }
      if (accessToken) {
        return <Navigate to="/" />;
      }
  
  const Blurhandler =async (e: React.FocusEvent<HTMLInputElement>) => {
  
  
   await trigger("Email"); // ✅ Revalidate on every blur
  
    const { isDirty, invalid } = getFieldState("Email");
    if (isDirty&&!invalid&&enteredEmail!==e.target.value) {
      await checkemailfun(e.target.value);
      console.log(enteredEmail)
    }
    else {
      console.log("n")
    }

  };
  console.log(errors.Email)
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Forminput
        name="Fname"
        error={errors.Fname?.message}
        register={register}
        label="Fname"
      ></Forminput>
      <Forminput
        name="Lname"
        error={errors.Lname?.message}
        register={register}
        label="Lname"
      ></Forminput>
      <Forminput
        name="Email"
        error={errors.Email?.message}
        register={register}
        label="Email"
        onBlur={Blurhandler}
        text={
          statecheck == "pending" && !errors.Email?.message
            ? "We're currently checking the availability of this email address. Please wait a moment"
            : statecheck == "valid" && !errors.Email?.message
            ? "This email is available for use"
            : statecheck == "notvalid" && !errors.Email?.message
            ? "This email is already in use."
            : ""
        }
      ></Forminput>
      <Forminput
        name="Password"
        error={errors.Password?.message}
        register={register}
        label="Password"
      ></Forminput>
      <Forminput
        name="Confirmpassword"
        error={errors.Confirmpassword?.message}
        register={register}
        label="Confirmpassword"
      ></Forminput>

      <Button
        variant="primary"
        type="submit"
        style={{ marginBottom: "10px" }}
        disabled={loading == "pending"}
      >
        {loading == "pending" ? (
          <Spinner animation="border" size="sm"></Spinner>
        ) : (
          "submit"
        )}
      </Button>
      <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
    </Form>
  );
}

export default Register;

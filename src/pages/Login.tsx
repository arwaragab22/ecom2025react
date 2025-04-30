import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Forminput from "@components/Form/Forminput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Actloginauth from "@store/Auth/Actionlogin";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { resetauth } from "@store/Auth/Authslice";
import { Navigate } from "react-router-dom";

function Login() {

    const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
    const { error,loading,accessToken}=useAppSelector(state=>state.Authslice)
  useEffect(() => {

    return () => {
      dispatch(resetauth())
    }
  }, [dispatch]);
      if (accessToken) {
return <Navigate to="/"/>
    }
  const navigate = useNavigate();
  console.log(searchParams.get("message"));
  const Forminputschema = z
    .object({

      Email: z.string().min(1, { message: "Email is required" }).email(),
      Password: z
        .string()
        .min(1, { message: "Password is required" })
        .regex(/.*[`~<>?,./!@#$%^&*()\-_+="'|{}\[\];:\\].*/, {
          message: "Must be at least 1 special character ",
        }),

    })

  type Forminput = z.infer<typeof Forminputschema>;

  const {
    register,
    handleSubmit,
  
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Forminputschema),
    mode: "onBlur", // 👈 Validate on every keystroke
  });

  const onSubmit: SubmitHandler<Forminput> = (data) => {
    searchParams.set("message", "");
    dispatch(Actloginauth(data)).unwrap().then(() => {
      navigate("/")
    })
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-success">
        {searchParams.get("message") == "account-created" && "Account created successfully! Please log in."}
          {searchParams.get("message")=="needtologin"&&"You need to log in to access this page."}
      </p>
      <Forminput
        name="Email"
        error={errors.Email?.message}
        register={register}
        label="Email"
      ></Forminput>
      <Forminput
        name="Password"
        error={errors.Password?.message}
        register={register}
        label="Password"
      ></Forminput>
      <Button
        variant="primary"
        type="submit"
        style={{ marginBottom: "10px", marginTop: "25px" }}
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

export default Login;

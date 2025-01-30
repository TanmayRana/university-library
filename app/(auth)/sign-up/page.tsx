/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import AuthForm from "@/components/AuthForm";
import signUp from "@/lib/actions/auth";

import { SignUpSchema } from "@/lib/validations";
import React from "react";

// const page = () => (
//   <AuthForm
//     type="SIGN_UP"
//     schema={SignUpSchema}
//     defaultValues={{
//       fullName: "",
//       email: "",
//       password: "",
//       universityId: 0,
//       universityCard: "",
//     }}
//     onSubmit={signUp}
//   />
// );

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={SignUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      password: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={signUp} // Ensure this is correctly imported and defined
  />
);

export default page;

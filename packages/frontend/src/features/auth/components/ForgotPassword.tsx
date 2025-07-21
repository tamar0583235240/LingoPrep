// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForgotPasswordMutation } from "../../../shared/api/passwordApi";
// import { ForgotPasswordForm } from "../types/types";
// import { Input } from "../../../shared/ui/input";
// import { Button } from "../../../shared/ui/button";
// import { CardSimple } from "../../../shared/ui/card";

// const schema = yup.object().shape({
//   email: yup.string().email("אימייל לא תקין").required("שדה חובה"),
// });

// const ForgotPassword = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<ForgotPasswordForm>({
//     resolver: yupResolver(schema),
//   });

//   const [forgotPassword, { isLoading, isSuccess, error }] =
//     useForgotPasswordMutation();

//   const onSubmit = async (data: ForgotPasswordForm) => {
//     try {
//       await forgotPassword({ email: data.email }).unwrap();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <CardSimple className="max-w-md w-full mx-auto p-6 space-y-4">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h2>שכחתי סיסמה</h2>

//         <label>אימייל:</label>
//         <Input type="email" {...register("email")} />
//         {errors.email && <p>{errors.email.message}</p>}

//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? "טוען..." : "שלח קישור לאיפוס"}
//         </Button>

//         {isSuccess && <p>אם {watch("email")} קיים במערכת – נשלחה אליו הודעה</p>}
//         {error && (
//           <p style={{ color: "red" }}>
//             {(error as any)?.data?.message || "אירעה שגיאה בשליחת האימייל"}
//           </p>
//         )}
//       </form>
//     </CardSimple>
//   );
// };

// export default ForgotPassword;
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "../../../shared/api/passwordApi";
import { ForgotPasswordForm } from "../types/types";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { CardSimple } from "../../../shared/ui/card";

const schema = yup.object().shape({
  email: yup.string().email("אימייל לא תקין").required("שדה חובה"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(schema),
  });

  const [forgotPassword, { isLoading, isSuccess, error }] =
    useForgotPasswordMutation();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <CardSimple className="max-w-md w-full p-8 space-y-6 shadow-md rounded-xl bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            שכחתי סיסמה
          </h2>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              אימייל
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "שולח..." : "שלח קישור לאיפוס סיסמה"}
          </Button>

          {isSuccess && (
            <p className="text-green-600 text-sm text-center">
              אם <span className="font-medium">{watch("email")}</span> קיים במערכת – נשלחה אליו הודעה
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center">
              {(error as any)?.data?.message || "אירעה שגיאה בשליחת האימייל"}
            </p>
          )}
        </form>
      </CardSimple>
    </div>
  );
};

export default ForgotPassword;


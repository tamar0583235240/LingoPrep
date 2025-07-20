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
    <CardSimple className="max-w-md w-full mx-auto p-6 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>שכחתי סיסמה</h2>

        <label>אימייל:</label>
        <Input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "טוען..." : "שלח קישור לאיפוס"}
        </Button>

        {isSuccess && <p>אם {watch("email")} קיים במערכת – נשלחה אליו הודעה</p>}
        {error && (
          <p style={{ color: "red" }}>
            {(error as any)?.data?.message || "אירעה שגיאה בשליחת האימייל"}
          </p>
        )}
      </form>
    </CardSimple>
  );
};

export default ForgotPassword;

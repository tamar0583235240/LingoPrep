import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../../shared/api/passwordApi";
import { ResetFormData } from "../types/types";
import { CardSimple } from "../../../shared/ui/card";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
const schema = yup.object().shape({
  password: yup.string().required("שדה חובה").min(6, "לפחות 6 תווים"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "הסיסמאות אינן תואמות")
    .required("שדה חובה"),
});
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: yupResolver(schema),
  });
  const [resetPassword, { isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();
  // Get token from query string
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const onSubmit = async (data: ResetFormData) => {
    try {
      if (!token) throw new Error("טוקן חסר");
      await resetPassword({ token, password: data.password }).unwrap();
      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <CardSimple className="max-w-md w-full mx-auto p-6 space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">סיסמה חדשה:</label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="confirm">אימות סיסמה:</label>
        <Input id="confirm" type="password" {...register("confirm")} />
        {errors.confirm && <p>{errors.confirm.message}</p>}

        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isLoading ? "טוען..." : "איפוס סיסמה"}
        </Button>
        {isError && (
          <p style={{ color: "red" }}>
            {(error as any)?.data?.message || "אירעה שגיאה"}
          </p>
        )}
        {isSuccess && <p>הסיסמה אופסה בהצלחה!</p>}
      </form>
    </CardSimple>
  );
};
export default ResetPassword;

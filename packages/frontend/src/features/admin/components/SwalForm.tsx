import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { userSchema } from "../validation/userSchema";
import { UserFormFields, user } from "../types/userTypes";
import { useCreateUserMutation } from "../services/adminApi";
import { ChevronDown } from "lucide-react";

const SwalForm = () => {
  const [createUser] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormFields>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<UserFormFields> = async (data) => {
    const fullUser: user = {
      id: Math.random().toString(36).substring(2, 15),
      ...data,
      phone: data.phone || "",
      createdAt: new Date(),
      isActive: false,
      first_name: "",
      last_name: "",
      email: data.email,
      role: data.role,
      password: data.password || null,
      slug: null,
      contentReports: [],
      experienceThanks: [],
      interviewExperiences: [],
      answers: [],
      feedbacks: [],
      passwordResetTokens: [],
      resources: [],
      sharedRecordings: [],
      userActivities: [],
      userReminderSettings: [], // ולא userReminderSetting
      userSessions: [],
      workExperiences: [],
    };

    try {
      await createUser(fullUser).unwrap();
      Swal.close();
      Swal.fire({
        title: "!נוסף",
        text: "המשתמש נוסף בהצלחה",
        icon: "success",
        iconColor: "#64748B",
        confirmButtonColor: "#00B894",
      });

      reset();
    } catch (err: any) {
      console.error(":שגיאה מהשרת", err);

      Swal.fire({
        icon: "error",
        iconColor: "#64748B",
        title: "שגיאה",
        text:
          err?.data?.error ||
          err?.error ||
          err?.message ||
          "אירעה שגיאה בעת הוספת המשתמש",
        confirmButtonColor: "#00B894",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
      dir="rtl"
    >
      <input
        {...register("firstName", { required: "שדה חובה" })}
        placeholder="שם פרטי"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      <span className="text-red-600 text-sm">{errors.firstName?.message}</span>

      <input
        {...register("lastName", { required: "שדה חובה" })}
        placeholder="שם משפחה"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      <span className="text-red-600 text-sm">{errors.lastName?.message}</span>

      <input
        {...register("email", { required: "שדה חובה" })}
        placeholder="אימייל"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      <span className="text-red-600 text-sm">{errors.email?.message}</span>

      <input
        {...register("password", { required: "שדה חובה" })}
        placeholder="סיסמה"
        type="password"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      <span className="text-red-600 text-sm">{errors.password?.message}</span>

      <input
        {...register("phone", { required: "שדה חובה" })}
        placeholder="טלפון"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      <span className="text-red-600 text-sm">{errors.phone?.message}</span>

      <div className="relative">
        <select
          {...register("role", { required: "יש לבחור תפקיד" })}
          className="text-right text-gray-400 border border-gray-300 rounded px-3 py-2 pr-10 w-full bg-white appearance-none"
          defaultValue=""
        >
          <option value="" disabled hidden>
            בחר תפקיד
          </option>
          <option className="text-black" value="student">
            תלמיד
          </option>
          <option className="text-black" value="manager">
            מנהל
          </option>
        </select>

        <ChevronDown
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          size={18}
        />
      </div>
      <span className="text-red-600 text-sm">{errors.role?.message}</span>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        שמור
      </button>
    </form>
  );
};

export default SwalForm;

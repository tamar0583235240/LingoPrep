import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { loginSuccess } from '../store/authSlice';
import GoogleAuthButton from './GoogleAuthButton';
import { CardSimple } from '../../../shared/ui/card';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // מצב ניהול השלבים - 'form' = מילוי פרטים, 'verify' = אימות קוד
  const [step, setStep] = useState<'form' | 'verify'>('form');

  // פרטי המשתמש שהוזנו
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  // קוד האימות שהמשתמש מזין
  const [code, setCode] = useState('');

  // הודעות למשתמש (שגיאות / הצלחות)
  const [message, setMessage] = useState('');

  // מצב טעינה עבור כל פעולה
  const [loading, setLoading] = useState(false);

  // אחראי על שליחת פרטי הרשמה לבקשת קוד אימות
  const requestSignupCode = async () => {
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/auth/signup/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('קוד אימות נשלח למייל. אנא הזן את הקוד להמשך.');
        setStep('verify');
      } else {
        setMessage(data.message || 'שגיאה בשליחת הקוד');
      }
    } catch {
      setMessage('שגיאה בשליחת הבקשה. נסה שוב.');
    }
    setLoading(false);
  };

  // אחראי על אימות הקוד וסיום הרשמה
  const confirmSignup = async () => {
    setMessage('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/auth/signup/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('ההרשמה הושלמה בהצלחה!');
        dispatch(loginSuccess(data)); // מחובר אוטומטית
        navigate("/");
      } else {
        setMessage(data.message || 'קוד לא תקין, נסה שנית.');
      }
    } catch {
      setMessage('שגיאה באימות הקוד. נסה שנית.');
    }
    setLoading(false);
  };

  // טיפול בשינוי שדות הטופס
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // טיפול בשינוי קוד האימות
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.slice(0, 6));
  };

  // טיפול בכפתור שליחה בהתאם לשלב
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'form') {
      requestSignupCode();
    } else if (step === 'verify') {
      if (code.length !== 6) {
        setMessage('נא להזין קוד בן 6 ספרות.');
        return;
      }
      confirmSignup();
    }
  };

  return (
    <CardSimple className="max-w-md w-full mx-auto p-6 space-y-4">
    <form onSubmit={handleSubmit}>
      <h2>הרשמה</h2>

      {step === 'form' && (
        <>
          <Input
            name="firstName"
            placeholder="שם פרטי"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            placeholder="שם משפחה"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="אימייל"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="סיסמה"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            placeholder="טלפון (אופציונלי)"
            value={form.phone}
            onChange={handleChange}
          />
        </>
      )}

      {step === 'verify' && (
        <>
          <p>קוד אימות נשלח למייל: <b>{form.email}</b></p>
          <Input
            type="text"
            maxLength={6}
            placeholder="הזן קוד אימות"
            value={code}
            onChange={handleCodeChange}
            pattern="\d{6}"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
          />
          <Button
            disabled={loading}
            onClick={requestSignupCode}
            style={{ marginTop: '0.5rem' }}
          >
            שלח קוד מחדש
          </Button>
        </>
      )}

      <Button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'טוען...' : step === 'form' ? 'הרשם' : 'אמת קוד'}
      </Button>

      {message && <p style={{ color: step === 'verify' ? 'green' : 'red', marginTop: '1rem' }}>{message}</p>}

      {step === 'form' && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>או הרשם עם:</p>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <GoogleAuthButton />
          </div>
        </div>
      )}
    </form>
    </CardSimple>
  );
};

export default SignupForm;

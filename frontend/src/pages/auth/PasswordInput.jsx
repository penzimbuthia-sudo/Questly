import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ id, name, value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
        <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 pr-9 text-sm text-fg outline-none focus:border-royal"
      />
    </div>
  )
}
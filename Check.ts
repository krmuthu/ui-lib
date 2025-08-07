import React, { useState, useRef } from ‘react’;

interface CheckboxProps {
id?: string;
label?: string;
checked?: boolean;
defaultChecked?: boolean;
onChange?: (checked: boolean) => void;
disabled?: boolean;
readOnly?: boolean;
error?: boolean;
className?: string;
size?: ‘sm’ | ‘md’ | ‘lg’;
}

const Checkbox: React.FC<CheckboxProps> = ({
id,
label,
checked,
defaultChecked = false,
onChange,
disabled = false,
readOnly = false,
error = false,
className = ‘’,
size = ‘md’
}) => {
const [internalChecked, setInternalChecked] = useState(defaultChecked);
const [isFocused, setIsFocused] = useState(false);
const [isPressed, setIsPressed] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);

const isControlled = checked !== undefined;
const isChecked = isControlled ? checked : internalChecked;

const handleChange = () => {
if (disabled || readOnly) return;

```
const newChecked = !isChecked;
if (!isControlled) {
  setInternalChecked(newChecked);
}
onChange?.(newChecked);
```

};

const handleKeyDown = (e: React.KeyboardEvent) => {
if (e.key === ’ ’ || e.key === ‘Enter’) {
e.preventDefault();
setIsPressed(true);
}
};

const handleKeyUp = (e: React.KeyboardEvent) => {
if (e.key === ’ ’ || e.key === ‘Enter’) {
e.preventDefault();
setIsPressed(false);
handleChange();
}
};

const handleMouseDown = () => {
if (!disabled && !readOnly) {
setIsPressed(true);
}
};

const handleMouseUp = () => {
setIsPressed(false);
};

// Size configurations
const sizeConfig = {
sm: {
checkbox: ‘w-4 h-4’,
text: ‘text-sm’,
gap: ‘gap-2’
},
md: {
checkbox: ‘w-5 h-5’,
text: ‘text-base’,
gap: ‘gap-3’
},
lg: {
checkbox: ‘w-6 h-6’,
text: ‘text-lg’,
gap: ‘gap-3’
}
};

// State-based styling
const getCheckboxStyles = () => {
let baseStyles = `${sizeConfig[size].checkbox} border-2 rounded-sm flex items-center justify-center transition-all duration-150 ease-in-out cursor-pointer relative`;

```
if (disabled) {
  baseStyles += ' cursor-not-allowed bg-gray-100 border-gray-300';
  if (isChecked) {
    baseStyles += ' bg-gray-200';
  }
} else if (readOnly) {
  baseStyles += ' cursor-default bg-gray-50 border-gray-400';
  if (isChecked) {
    baseStyles += ' bg-blue-100 border-blue-300';
  }
} else if (error) {
  baseStyles += ' border-red-500';
  if (isChecked) {
    baseStyles += ' bg-red-500';
  } else if (isFocused) {
    baseStyles += ' border-red-600 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]';
  }
} else {
  // Normal states
  if (isChecked) {
    if (isPressed) {
      baseStyles += ' bg-blue-700 border-blue-700 scale-95';
    } else if (isFocused) {
      baseStyles += ' bg-blue-600 border-blue-600 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]';
    } else {
      baseStyles += ' bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700';
    }
  } else {
    if (isPressed) {
      baseStyles += ' border-gray-400 bg-gray-100 scale-95';
    } else if (isFocused) {
      baseStyles += ' border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]';
    } else {
      baseStyles += ' border-gray-300 hover:border-gray-400 bg-white';
    }
  }
}

return baseStyles;
```

};

const getLabelStyles = () => {
let labelStyles = `${sizeConfig[size].text} select-none transition-colors duration-150`;

```
if (disabled) {
  labelStyles += ' text-gray-400 cursor-not-allowed';
} else if (readOnly) {
  labelStyles += ' text-gray-600 cursor-default';
} else if (error) {
  labelStyles += ' text-red-700';
} else {
  labelStyles += ' text-gray-700 cursor-pointer';
}

return labelStyles;
```

};

const checkmarkSize = size === ‘sm’ ? ‘w-2.5 h-2.5’ : size === ‘md’ ? ‘w-3 h-3’ : ‘w-3.5 h-3.5’;

return (
<div className={`flex items-center ${sizeConfig[size].gap} ${className}`}>
<div className="relative">
<input
ref={inputRef}
id={id}
type=“checkbox”
className=“sr-only”
checked={isChecked}
onChange={handleChange}
onFocus={() => setIsFocused(true)}
onBlur={() => setIsFocused(false)}
onKeyDown={handleKeyDown}
onKeyUp={handleKeyUp}
disabled={disabled}
readOnly={readOnly}
aria-invalid={error}
/>
<div
className={getCheckboxStyles()}
onClick={handleChange}
onMouseDown={handleMouseDown}
onMouseUp={handleMouseUp}
onMouseLeave={() => setIsPressed(false)}
role=“checkbox”
aria-checked={isChecked}
tabIndex={disabled ? -1 : 0}
>
{isChecked && (
<svg
className={`${checkmarkSize} ${disabled ? 'text-gray-400' : readOnly ? 'text-blue-600' : 'text-white'} transition-all duration-150`}
fill=“none”
stroke=“currentColor”
viewBox=“0 0 24 24”
>
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={3}
d="M5 13l4 4L19 7"
/>
</svg>
)}
</div>
</div>
{label && (
<label
htmlFor={id}
className={getLabelStyles()}
onClick={disabled || readOnly ? undefined : handleChange}
>
{label}
</label>
)}
</div>
);
};

// Demo component showing all states
const CheckboxDemo: React.FC = () => {
const [states, setStates] = useState({
default: false,
hover: false,
pressed: false,
focus: false,
error: false,
disabled: true,
readOnly: false
});

const handleStateChange = (stateName: string) => (checked: boolean) => {
setStates(prev => ({
…prev,
[stateName]: checked
}));
};

return (
<div className="p-8 bg-gray-50 min-h-screen">
<div className="max-w-4xl mx-auto">
<h1 className="text-3xl font-bold text-gray-900 mb-8">Custom Checkbox Component</h1>

```
    <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">All States Demo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Basic States</h3>
          <Checkbox
            id="default"
            label="Default"
            checked={states.default}
            onChange={handleStateChange('default')}
          />
          <Checkbox
            id="checked-default"
            label="Default (Checked)"
            defaultChecked={true}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Interactive States</h3>
          <Checkbox
            id="focus"
            label="Focus (Tab to focus)"
            checked={states.focus}
            onChange={handleStateChange('focus')}
          />
          <div className="text-sm text-gray-500">
            * Hover and pressed states are automatically handled
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Special States</h3>
          <Checkbox
            id="error"
            label="Error State"
            checked={states.error}
            onChange={handleStateChange('error')}
            error={true}
          />
          <Checkbox
            id="disabled"
            label="Disabled"
            checked={states.disabled}
            onChange={handleStateChange('disabled')}
            disabled={true}
          />
          <Checkbox
            id="readonly"
            label="Read-only"
            checked={states.readOnly}
            onChange={handleStateChange('readOnly')}
            readOnly={true}
          />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Size Variations</h2>
      
      <div className="space-y-4">
        <Checkbox
          id="small"
          label="Small checkbox"
          size="sm"
          defaultChecked={true}
        />
        <Checkbox
          id="medium"
          label="Medium checkbox (default)"
          size="md"
          defaultChecked={true}
        />
        <Checkbox
          id="large"
          label="Large checkbox"
          size="lg"
          defaultChecked={true}
        />
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Usage Examples</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <code className="text-sm text-gray-800">
          {`<Checkbox
```

id=“example”
label=“Accept terms and conditions”
checked={accepted}
onChange={setAccepted}
error={showError}
/>`}
</code>
</div>

```
      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Features:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Fully accessible with keyboard navigation</li>
          <li>Support for controlled and uncontrolled components</li>
          <li>Hover, focus, pressed, error, disabled, and read-only states</li>
          <li>Three size variations (sm, md, lg)</li>
          <li>TypeScript support</li>
          <li>Tailwind CSS styling with smooth transitions</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

);
};

export default CheckboxDemo;

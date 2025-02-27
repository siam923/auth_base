You are a next js 15 developer with great experience in Shadcn, ShadCn Form, which uses react-hook-form under the hood. You have some form utils that wraps shadcn Form and you will help the user the use the wrapper form elements in their component.

Bellow are your components:
```
// @/components/form-utils/form-input":
// components/form-utils/form-input.jsx
"use client";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  type = "text",
  className,
  labelClassName,
  inputClassName,
  IconLeft,
  IconRight,
  onValueChange,
  transform,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <div className="flex items-center gap-2 mb-2">
              <FormLabel className={cn("flex-grow", labelClassName)}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            </div>
          )}
          <FormControl>
            <div className="relative">
              {IconLeft && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {IconLeft}
                </div>
              )}
              <Input
                {...field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                className={cn(
                  IconLeft && "pl-9",
                  IconRight && "pr-9",
                  inputClassName
                )}
                onChange={(e) => {
                  const value = transform?.output 
                    ? transform.output(e.target.value) 
                    : e.target.value;
                  field.onChange(value);
                  onValueChange?.(value);
                }}
                value={transform?.input ? transform.input(field.value) : field.value}
                {...props}
              />
              {IconRight && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {IconRight}
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
```

```
// components/form-utils/form-textarea.jsx
"use client";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormTextarea = ({
  control,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  className,
  labelClassName,
  textareaClassName,
  rows = 3,
  onValueChange,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <div className="flex items-center gap-2 mb-2">
              <FormLabel className={cn("flex-grow", labelClassName)}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            </div>
          )}
          <FormControl>
            <Textarea
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              className={cn(textareaClassName)}
              rows={rows}
              onChange={(e) => {
                field.onChange(e);
                onValueChange?.(e.target.value);
              }}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
```

```
// components/form-utils/select-input.jsx
"use client";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectInput = ({
  control,
  items,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  className,
  labelClassName,
  triggerClassName,
  Icon,
  valueKey = "value",
  displayKey = "label",
  onValueChange,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Ensure the value is never undefined
        const value = field.value?.toString() || "";
        
        // Debug log
        // console.log(`SelectInput ${name} value:`, value);

        return (
          <FormItem className={cn("w-full", className)}>
            {label && (
              <div className="flex items-center gap-2 mb-2">
                <FormLabel className={cn("flex-grow", labelClassName)}>
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                {Icon && <span className="text-gray-500 flex-shrink-0">{Icon}</span>}
              </div>
            )}
            <Select 
              onValueChange={(newValue) => {
                field.onChange(newValue);
                onValueChange?.(newValue);
              }} 
              value={value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className={cn("w-full", triggerClassName)}>
                  <SelectValue
                    placeholder={placeholder ? placeholder : "Select option"}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item, idx) => (
                  <SelectItem
                    key={idx}
                    value={item[valueKey].toString()}
                    className="cursor-pointer"
                  >
                    {item[displayKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectInput;
```

```
// components/form-utils/date-input.jsx
"use client";
import { format, isValid } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CustomFormDescription = ({ children }) => {
  return (
    <div className="text-sm text-muted-foreground">
      {children}
    </div>
  );
};

const DateInput = ({
  control,
  name,
  label,
  description,
  placeholder = "Select date",
  required,
  disabled,
  className,
  labelClassName,
  buttonClassName,
  calendarClassName,
  minDate,
  maxDate,
  disabledDates,
  disabledDays,
  onValueChange,
  validateDate,
  clearErrors,
  descriptionComponent,
  allowClear = true,
  Icon, // Added to maintain consistency with other inputs
  transform = {
    input: (value) => (value ? new Date(value) : undefined),
    output: (date) => (date ? date.toISOString() : ""),
  },
}) => {
  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return isValid(parsedDate) ? format(parsedDate, "PPP") : "";
  };

  const isDateDisabled = (date) => {
    if (!date || !isValid(date)) return true;
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disabledDates?.includes(date)) return true;
    if (disabledDays?.includes(date.getDay())) return true;
    return false;
  };

  const handleDateSelect = (date, field) => {
    if (disabled) return;

    // If validation function exists, check if date is valid
    if (validateDate && !validateDate(date)) {
      return;
    }

    const transformedValue = transform.output(date);
    field.onChange(transformedValue);
    onValueChange?.(transformedValue);

    // Clear errors if specified
    if (clearErrors) {
      clearErrors(name);
    }
  };

  const handleClear = (field, e) => {
    e.stopPropagation(); // Prevent popover from opening
    field.onChange("");
    onValueChange?.("");
    if (clearErrors) {
      clearErrors(name);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <div className="flex items-center gap-2 mb-2">
              <FormLabel className={cn("flex-grow", labelClassName)}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
              {Icon && <span className="text-gray-500 flex-shrink-0">{Icon}</span>}
            </div>
          )}
          
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Button
                    variant={field.value ? "outline" : "secondary"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      disabled && "cursor-not-allowed opacity-50",
                      field.value && allowClear && "pr-8",
                      buttonClassName
                    )}
                    disabled={disabled}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      formatDate(transform.input(field.value))
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                  {field.value && allowClear && !disabled && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
                      onClick={(e) => handleClear(field, e)}
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      <span className="sr-only">Clear date</span>
                    </Button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent 
                className={cn("w-auto p-0", calendarClassName)} 
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={transform.input(field.value)}
                  onSelect={(date) => handleDateSelect(date, field)}
                  disabled={isDateDisabled}
                  initialFocus
                  {...(minDate && { fromDate: minDate })}
                  {...(maxDate && { toDate: maxDate })}
                />
              </PopoverContent>
            </Popover>
          </FormControl>

          {description && !descriptionComponent && (
            <FormDescription>{description}</FormDescription>
          )}
          
          {descriptionComponent && (
            <CustomFormDescription>
              {descriptionComponent}
            </CustomFormDescription>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
```
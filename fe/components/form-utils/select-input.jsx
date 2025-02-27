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
  triggerClassName, // This prop will control the height
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
        const value = field.value?.toString() || "";
        // console.log(`SelectInput (${name}) - field value:`, value);
        // console.log(`SelectInput (${name}) - items:`, items);
        return (
          <FormItem className={cn("w-full", className)}>
            {label && (
              <div className="flex items-center gap-2 mb-2">
                <FormLabel className={cn("flex-grow", labelClassName)}>
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                {Icon && (
                  <span className="text-gray-500 flex-shrink-0">{Icon}</span>
                )}
              </div>
            )}
            <Select
              key={value} // Force remount when field value change
              onValueChange={(newValue) => {
                field.onChange(newValue);
                onValueChange?.(newValue);
              }}
              value={value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className={triggerClassName}>
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

import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
// import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
};

const CInputField = ({
  label,
  name,
  type,
  defaultValue,
  disabled,
  readOnly,
  placeholder,
}: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              defaultValue={defaultValue}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default CInputField;

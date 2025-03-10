import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import moment from "moment";
type TInputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onValueChange: (date: moment.Moment | null) => void;
};

const CDatePicker = ({
  label,
  name,
  disabled,
  onValueChange,
}: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              onChange={onValueChange}
              id={name}
              size="large"
              disabled={disabled}
              style={{ width: "100%" }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default CDatePicker;

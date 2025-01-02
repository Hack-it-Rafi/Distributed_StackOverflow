import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Card, Col, Divider, Row, Typography, Space } from "antd";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { primaryButton } from "../config/themeConfig";
import CForm from "../components/form/CForm";
import CInputField from "../components/form/CInputField";

const { Title, Text } = Typography;

const SignUp: React.FC = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");
    console.log(data);

    try {
      const res = await signUp(data);
      if (res.error) {
        toast.error("Failed to create account", { id: toastId });
      } else {
        toast.success("User created successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        className="signup-card"
        style={{
          width: "100%",
          maxWidth: 500,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
            Create an Account
          </Title>
          <CForm onSubmit={onSubmit}>
            <Row gutter={[16, 16]}>
              <Col span={24} lg={12}>
                <CInputField type="text" label="Name" name="name" />
              </Col>
              <Col span={24} lg={12}>
                <CInputField type="email" label="Email" name="email" />
              </Col>
              <Col span={24} lg={12}>
                <CInputField type="text" label="Phone" name="phone" />
              </Col>
              <Col span={24} lg={12}>
                <CInputField type="password" label="Password" name="password" />
              </Col>
              <Col span={24}>
                <CInputField type="text" label="Profile Image URL" name="imageUrl" />
              </Col>
              <Col span={24}>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  style={{ ...primaryButton, borderRadius: "4px" }}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </CForm>
          <Divider />
          <Text style={{ display: "block", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1890ff" }}>
              Log in
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default SignUp;

// import React, { useState } from "react";
// import { Row, Col, Typography, List, Input, Button, Space } from "antd";
// import { FacebookFilled, LinkedinFilled, TwitterSquareFilled, GithubOutlined } from "@ant-design/icons";
// import { SiVisa, SiMastercard, SiPaypal, SiAmericanexpress } from "react-icons/si";

// const { Title, Text, Link } = Typography;

// const Footer = () => {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     console.log("Subscribed with email:", email);
//     setEmail("");
//   };

//   return (
//     <div className="bg-gray-900 text-white py-8">
//       <div className="container mx-auto px-4">
//         <Row gutter={[16, 16]} justify="space-between">
//           {/* About Us Section */}
//           <Col xs={24} sm={12} md={6}>
//             <p  className="text-xl  text-white">About Us</p>
//             <List className="footer-list">
//               <List.Item>
//                 <p className="text-white">Our Story</p>
//               </List.Item>
//               <List.Item>
//               <p className="text-white">Career</p>
//               </List.Item>
//               <List.Item>
//               <p className="text-white">Press</p>              </List.Item>
//             </List>
//           </Col>

//           {/* Customer Service Section */}
//           <Col xs={24} sm={12} md={6}>
//             <p  className="text-xl text-white">Customer Service</p>
//             <List className="footer-list">
//               <List.Item>
//               <p className="text-white">Contact Us</p>              </List.Item>
//               <List.Item>
//               <p className="text-white">FAQ</p>              </List.Item>
//               <List.Item>
//               <p className="text-white">Shiping & Returns</p>              </List.Item>
//             </List>
//           </Col>

//           {/* Legal Section */}
//           <Col xs={24} sm={12} md={6}>
//             <p  className="text-xl text-white">Legal</p>
//             <List className="footer-list">
//               <List.Item>
//               <p className="text-white">Privacy Policy</p>              </List.Item>
//               <List.Item>
//               <p className="text-white">Our Story</p>Terms & Services
//               </List.Item>
//               <List.Item>
//               <p className="text-white">Cookie Policy</p>
//               </List.Item>
//             </List>
//           </Col>

//           {/* Stay Connected Section */}
//           <Col xs={24} sm={12} md={6}>
//             <p  className="text-xl mb-2 text-white">Stay Connected</p>
//             <Space size="large" className="social-icons mb-4">
//               <Link href="https://www.facebook.com/profile.php?id=100008488000660" className="text-white">
//                 <FacebookFilled className="md:text-2xl text-xl text-white"/>
//               </Link>
//               <Link href="https://www.linkedin.com/in/nsakib27/" className="text-white">
//                 <LinkedinFilled className="md:text-2xl text-xl text-white" />
//               </Link>
//               <Link href="https://x.com" className="text-white">
//                 <TwitterSquareFilled className="md:text-2xl text-xl text-white" />
//               </Link>
//               <Link href="https://github.com/Nazmos27" className="text-white">
//                 <GithubOutlined className="md:text-2xl text-xl text-white" />
//               </Link>
//             </Space>
//             <p className="mb-2 text-white">Subscribe to our newsletter</p>
//             <form onSubmit={handleSubscribe}>
//               <Input
//                 type="email"
//                 placeholder="Your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mb-2"
//                 required
//                 style={{ color: "#fff", backgroundColor: "#333", borderColor: "#444" }} // Customize input color
//               />
//               <Button type="primary" htmlType="submit" block>Subscribe</Button>
//             </form>
//           </Col>
//         </Row>

//         {/* Payment Methods */}
//         <Row justify="center" style={{ marginTop: "30px" }}>
//           <Col>
//             <p className="text-center mb-2 text-white">Accepted Payment Methods</p>
//             <Space size="large" className="payment-icons">
//               <SiVisa style={{ fontSize: "36px", color: "#ffffff" }} />
//               <SiMastercard style={{ fontSize: "36px", color: "#ffffff" }} />
//               <SiPaypal style={{ fontSize: "36px", color: "#ffffff" }} />
//               <SiAmericanexpress style={{ fontSize: "36px", color: "#ffffff" }} />
//             </Space>
//           </Col>
//         </Row>

//         {/* Copyright */}
//         <Row justify="center" style={{ marginTop: "30px" }}>
//           <Text className="text-center text-gray-400">
//             © {new Date().getFullYear()} Mecha Freak. All rights reserved.
//           </Text>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Footer;

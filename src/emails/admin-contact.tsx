import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";

type AdminContactEmailProps = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function AdminContactEmail({
  name,
  email,
  company,
  message,
}: AdminContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>New Contact Submission</Heading>
          </Section>

          <Section style={content}>
            <div style={field}>
              <Text style={fieldLabel}>Name</Text>
              <Text style={fieldValue}>{name}</Text>
            </div>

            <div style={field}>
              <Text style={fieldLabel}>Email</Text>
              <Text style={fieldValue}>{email}</Text>
            </div>

            <div style={field}>
              <Text style={fieldLabel}>Company</Text>
              <Text style={fieldValue}>{company}</Text>
            </div>

            <div style={{ ...field, ...messageField }}>
              <Text style={fieldLabel}>Message</Text>
              <Text style={{ ...fieldValue, whiteSpace: "pre-wrap" }}>
                {message}
              </Text>
            </div>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Received: {new Date().toLocaleString()} via verkron.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  backgroundColor: "#ffffff",
  margin: "0",
  padding: "40px 20px",
  lineHeight: "1.6",
  color: "#000000",
};

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
};

const header = {
  padding: "24px",
  borderBottom: "1px solid #e5e5e5",
};

const heading = {
  fontSize: "18px",
  margin: "0",
  fontWeight: "600",
};

const content = {
  padding: "24px",
};

const field = {
  marginBottom: "16px",
};

const messageField = {
  marginBottom: "0",
};

const fieldLabel = {
  fontWeight: "500",
  fontSize: "14px",
  marginBottom: "4px",
  margin: "0 0 4px 0",
};

const fieldValue = {
  fontSize: "14px",
  padding: "8px 12px",
  border: "1px solid #e5e5e5",
  borderRadius: "4px",
  backgroundColor: "#fafafa",
  margin: "0",
};

const footer = {
  padding: "16px 24px",
  borderTop: "1px solid #e5e5e5",
};

const footerText = {
  fontSize: "12px",
  color: "#666666",
  margin: "0",
};

export default AdminContactEmail;

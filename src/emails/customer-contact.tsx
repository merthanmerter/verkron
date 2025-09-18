import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";

type CustomerContactEmailProps = {
  name: string;
};

export function CustomerContactEmail({ name }: CustomerContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Thank You, {name}!</Heading>
          </Section>

          <Section style={content}>
            <Text style={message}>
              We've received your message and appreciate you reaching out to
              Verkron.
            </Text>

            <Text style={details}>
              Your inquiry is important to us, and we'll review it carefully to
              provide you with the most helpful response.
            </Text>

            <div style={nextSteps}>
              <Heading style={nextStepsHeading}>What happens next?</Heading>
              <ul style={nextStepsList}>
                <li style={nextStepsItem}>
                  Our team will review your message within 24 hours
                </li>
                <li style={nextStepsItem}>
                  We'll respond with detailed information about your inquiry
                </li>
                <li style={nextStepsItem}>
                  If needed, we'll schedule a follow-up call to discuss your
                  requirements
                </li>
              </ul>
            </div>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Verkron Team
              <br />
              verkron.com
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
  padding: "32px 24px",
  textAlign: "center" as const,
  borderBottom: "1px solid #e5e5e5",
};

const heading = {
  fontSize: "24px",
  margin: "0",
  fontWeight: "600",
};

const content = {
  padding: "32px 24px",
  textAlign: "center" as const,
};

const message = {
  fontSize: "16px",
  marginBottom: "24px",
  margin: "0 0 24px 0",
};

const details = {
  fontSize: "14px",
  color: "#666666",
  marginBottom: "32px",
  margin: "0 0 32px 0",
};

const nextSteps = {
  textAlign: "left" as const,
  backgroundColor: "#fafafa",
  padding: "20px",
  borderRadius: "6px",
  border: "1px solid #e5e5e5",
};

const nextStepsHeading = {
  margin: "0 0 12px 0",
  fontSize: "16px",
  fontWeight: "600",
};

const nextStepsList = {
  margin: "0",
  paddingLeft: "20px",
};

const nextStepsItem = {
  marginBottom: "8px",
};

const footer = {
  padding: "24px",
  borderTop: "1px solid #e5e5e5",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#666666",
  margin: "0",
};

export default CustomerContactEmail;

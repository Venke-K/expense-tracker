import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="display-4 fw-bold">Take Control of Your Finances</h1>
          <p className="lead">
            Track your expenses, filter by date, and get visual insights with ease.
          </p>
          <Button variant="light" size="lg" href="/login">
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Key Features</h2>
          <Row className="text-center g-4">
            <Col md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 shadow rounded bg-white"
              >
                <h4>Add & Manage Expenses</h4>
                <p>Easily add, edit, or delete your daily expenses with just a few clicks.</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 shadow rounded bg-white"
              >
                <h4>Date-wise Filtering</h4>
                <p>Filter your expenses by custom date ranges for better tracking.</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 shadow rounded bg-white"
              >
                <h4>Insightful Charts</h4>
                <p>Visualize your spending habits through dynamic summary charts.</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5 bg-secondary text-white">
        <Container>
          <h2 className="text-center mb-4">Why Choose Our Expense Tracker?</h2>
          <Row className="g-4 text-center">
            <Col md={4}>
              <h5>Secure & Reliable</h5>
              <p>Your data is protected with robust authentication mechanisms.</p>
            </Col>
            <Col md={4}>
              <h5>Simple & Intuitive</h5>
              <p>Designed with user experience in mind for effortless expense management.</p>
            </Col>
            <Col md={4}>
              <h5>Data-Driven Insights</h5>
              <p>Understand your spending patterns and manage your budget wisely.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>
          © {new Date().getFullYear()} Expense Tracker. All Rights Reserved.
        </p>
      </footer>
    </Container>
  );
};

export default LandingPage; 




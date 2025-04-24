import OrdersPage from "./Order";
import Card from "../components/card";

const Dashboard = () => {
  return (
    <div className="dashboard-container " style={styles.container}>
      <section>
        <div className="w-full gap-5 flex items-center justify-between mb-6">
          <Card title={"Total Order"} content={"15"} />
          <Card title={"Total Payment"} content={"15"} />
          <Card title={"Total Product"} content={"15"} />
        </div>
        <OrdersPage />
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;

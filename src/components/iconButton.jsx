import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const IconButton = ({ onClick }) => {
  return (
    <Button
      variant="danger"
      onClick={onClick}
      style={{ width: "40px", height: "40px", padding: "0" }}
    >
      <FaTrash />
    </Button>
  );
};

export default IconButton;

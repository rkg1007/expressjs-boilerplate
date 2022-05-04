import { NotFound } from "../errors";

const notFound = (req, res) => {
  throw new NotFound("Page not Found");
};

export default notFound;
